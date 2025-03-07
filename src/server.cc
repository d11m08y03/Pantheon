#include "server.hpp"

#include <exception>

#include "bcrypt.h"
#include "env.h"
#include "jwt-cpp/jwt.h"

Server::Server(int port) : m_port(port) {
    try {
        m_db = std::make_unique<Database>("./app.db", true);
        m_db->ApplyMigrations();
        SetupRoutes();
    } catch (const std::exception& e) {
        std::cerr << "Server initialization failed: " << e.what() << std::endl;
        exit(1);
    } catch (...) {
        std::cerr << "Server initialization failed due to an unknown error."
                  << std::endl;
        exit(1);
    }
};

void Server::ValidateJWT(const std::string& token) {
    try {
        auto decoded = jwt::decode(token);
        auto verifier = jwt::verify()
                            .allow_algorithm(jwt::algorithm::hs256 {JWT_SECRET})
                            .with_issuer("auth0");

        verifier.verify(decoded);

        if (decoded.has_payload_claim("exp")) {
            auto exp = decoded.get_payload_claim("exp").as_date();
            if (std::chrono::system_clock::now() >= exp) {
                throw std::runtime_error("Token expired");
            }
        }
    } catch (const std::exception& e) {
        throw std::runtime_error("Could not verify JWT");
    }
}

void Server::SetupRoutes() {
    CROW_ROUTE(m_app, "/api/login")
        .methods("POST"_method)([this](const crow::request& req) {
            auto payload = crow::json::load(req.body);
            if (!payload) {
                return crow::response(400, "Invalid JSON payload");
            }

            if (!payload.has("email") || !payload.has("password")) {
                return crow::response(
                    400,
                    "Missing required fields: 'email' and/or 'password'"
                );
            }

            std::string email;
            std::string password;
            try {
                email = payload["email"].s();
                password = payload["password"].s();
            } catch (const std::exception& e) {
                return crow::response(
                    400,
                    "Invalid field types in the JSON payload"
                );
            }

            try {
                auto user = m_db->GetUserByEmail(email);
                if (!user) {
                    return crow::response(404, "User not found");
                }

                if (!bcrypt::validatePassword(password, user->m_password)) {
                    return crow::response(401, "Incorrect password");
                }

                auto token =
                    jwt::create()
                        .set_type("JWS")
                        .set_issuer("auth0")
                        .set_subject(user->m_email)
                        .set_issued_at(std::chrono::system_clock::now())
                        .set_expires_at(
                            std::chrono::system_clock::now()
                            + std::chrono::hours(24)
                        )
                        .set_payload_claim(
                            "role",
                            jwt::claim(std::string("admin"))
                        )
                        .sign(jwt::algorithm::hs256 {JWT_SECRET});

                crow::json::wvalue response;
                response["message"] = "Login successful";
                response["token"] = token;

                return crow::response(200, response);
            } catch (const std::exception& e) {
                CROW_LOG_ERROR << "Error during login process: " << e.what();
                return crow::response(500, "Internal server error");
            }
        });

    // clang-format off
    #ifdef P_DEBUG
			CROW_ROUTE(m_app, "/api/genesis")
				.methods("POST"_method)([this](const crow::request& req) {
					auto payload = crow::json::load(req.body);
					if (!payload) {
						return crow::response(
							crow::status::BAD_REQUEST,
							"Invalid JSON payload"
						);
					}

					if (!payload.has("email") || !payload.has("password")
						|| !payload.has("name")) {
						return crow::response(
							crow::status::BAD_REQUEST,
							"Missing required field(s)"
						);
					}

					User user;

					try {
						user.m_name = payload["name"].s();
						user.m_email = payload["email"].s();
						user.m_password = payload["password"].s();
					} catch (const std::exception& e) {
						return crow::response(
							crow::status::BAD_REQUEST,
							e.what()
						);
					}

					try {
						m_db->CreateUser(user);
					} catch (const std::exception& e) {
						return crow::response(
							crow::status::INTERNAL_SERVER_ERROR
						);
					}

					return crow::response(crow::status::CREATED, "User created");
				});
    #endif // P_DEBUG
    // clang-format on
}

void Server::Run() {
    CROW_LOG_INFO << "Server started on port " << m_port << "\n";
    m_app.port(m_port).multithreaded().run();
}
