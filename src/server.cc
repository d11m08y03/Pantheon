#include "server.hpp"

#include "bcrypt.h"

Server::Server(int port) :
    m_port(port),
    m_db(std::make_unique<Database>("./app.db", true)) {
    SetupRoutes();
    m_db->ApplyMigrations();
};

void Server::SetupRoutes() {
    CROW_ROUTE(m_app, "/api/login")
        .methods("POST"_method)([this](const crow::request& req) {
            auto payload = crow::json::load(req.body);
            if (!payload) {
                return crow::response(400, "Invalid JSON payload");
            }

            std::string email;
            std::string password;

            if (!payload.has("email") || !payload.has("password")) {
                return crow::response(
                    400,
                    "Missing required fields: 'email' and/or 'password'"
                );
            }

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

                return crow::response(200, "Login successful");
            } catch (const std::exception& e) {
                CROW_LOG_ERROR << "Database or password validation error: "
                               << e.what();
                return crow::response(500, "Internal server error");
            }
        });
}

void Server::Run() {
    CROW_LOG_INFO << "Server started on port " << m_port << "\n";
    m_app.port(m_port).multithreaded().run();
}
