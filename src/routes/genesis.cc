#include "../../include/routes/genesis.hpp"

#include <exception>

GenesisRoutes::GenesisRoutes(Database& db) : m_db(db) {}

void GenesisRoutes::RegisterRoutes(crow::SimpleApp& app) {
    CROW_ROUTE(app, "/api/genesis")
        .methods("POST"_method)([this](const crow::request& req) {
            auto payload = crow::json::load(req.body);
            if (!payload) {
                return crow::response(400, "Invalid JSON payload");
            }

            if (!payload.has("email") || !payload.has("password")
                || !payload.has("name")) {
                return crow::response(
                    400,
                    "Missing required fields: 'email', 'password', and/or 'name'"
                );
            }

            User user;
            try {
                user.m_name = payload["name"].s();
                user.m_email = payload["email"].s();
                user.m_password = payload["password"].s();
            } catch (const std::exception& e) {
                return crow::response(
                    400,
                    "Invalid field types in the JSON payload"
                );
            }

            try {
                m_db.CreateUser(user);
            } catch (const std::exception& e) {
                return crow::response(
                    500,
                    "Internal server error while creating user"
                );
            }

            return crow::response(201, "User created successfully");
        });
}
