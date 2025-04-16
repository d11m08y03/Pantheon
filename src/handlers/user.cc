#include "handlers/user.hpp"

#include <crow/common.h>
#include <crow/json.h>

#include <exception>

#include "bcrypt.h"
#include "handlers/base.hpp"
#include "jwt-cpp/jwt.h"
#include "models/user.hpp"

UserHandler::UserHandler(
    const std::string& base_path,
    UserRepository& user_repo
) :
    BaseHandler(base_path),
    m_user_repo(user_repo) {}

crow::response
UserHandler::login(const std::string& email, const std::string& password) {
    auto user = m_user_repo.find_by_email(email);
    if (!user) {
        return BaseHandler::not_found_err("User not found");
    }

    if (!bcrypt::validatePassword(password, user->m_password_hash)) {
        return BaseHandler::unauthorised_err("Invalid password");
    }

    auto token =
        jwt::create()
            .set_type("JWS")
            .set_issuer("auth0")
            .set_subject(user->m_email)
            .set_issued_at(std::chrono::system_clock::now())
            .set_expires_at(
                std::chrono::system_clock::now() + std::chrono::hours(24)
            )
            .set_payload_claim("role", jwt::claim(std::string("admin")))
            .sign(jwt::algorithm::hs256 {"trust"});

    crow::json::wvalue resp;
    resp["message"] = "Login successful";
    resp["token"] = token;

    return crow::response(crow::OK, resp);
}

crow::response UserHandler::genesis(
    const std::string& name,
    const std::string& email,
    const std::string& password
) {
	const std::string password_hash = bcrypt::generateHash(password);

    Models::User user(name, email, password_hash);
    bool created = m_user_repo.create(user);

    if (!created) {
        return BaseHandler::internal_err("Failed to create user");
    }

    return crow::response(crow::status::CREATED, "User created");
}

void UserHandler::register_routes(App& app) {
    const std::string register_path = m_base_path + "/register";
    const std::string login_path = m_base_path + "/login";

    app.route_dynamic(login_path)
        .methods(crow::HTTPMethod::POST)([this](const crow::request& req) {
            auto payload = crow::json::load(req.body);

            if (!payload) {
                return BaseHandler::bad_request_err("Invalid JSON payload");
            }

            if (!payload.has("email") || !payload.has("password")) {
                return BaseHandler::bad_request_err(
                    "Missing required fields email and/or password"
                );
            }

            std::string email, password;

            try {
                email = payload["email"].s();
                password = payload["password"].s();
            } catch (const std::exception& e) {
                return BaseHandler::bad_request_err("Invalid field types");
            }

            return this->login(email, password);
        });

    app.route_dynamic(register_path)
        .methods(crow::HTTPMethod::POST)([this](const crow::request& req) {
            auto payload = crow::json::load(req.body);

            if (!payload) {
                return BaseHandler::bad_request_err("Invalid JSON payload");
            }

            if (!payload.has("name") || !payload.has("email")
                || !payload.has("password")) {
                return BaseHandler::bad_request_err("Missing required fields");
            }

            std::string name, email, password;

            try {
                name = payload["name"].s();
                email = payload["email"].s();
                password = payload["password"].s();
            } catch (const std::exception& e) {
                return BaseHandler::bad_request_err("Invalid field types");
            }

            return this->genesis(name, email, password);
        });
}
