#include "../../include/routes/base.hpp"
#include "bcrypt.h"
#include "database.hpp"
#include "env.h"
#include "jwt-cpp/jwt.h"

class AuthRoutes: public BaseHandler {
  private:
    Database& m_db;

  public:
    explicit AuthRoutes(Database& db) : m_db(db) {}

    void RegisterRoutes(crow::SimpleApp& app) override {
        CROW_ROUTE(app, "/api/login")
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
                    auto user = m_db.GetUserByEmail(email);
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
                    CROW_LOG_ERROR << "Error during login process: "
                                   << e.what();
                    return crow::response(500, "Internal server error");
                }
            });
    }
};
