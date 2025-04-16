#include "server.hpp"

#include <crow/logging.h>
#include <crow/middlewares/cors.h>

#include <memory>

#include "database.hpp"
#include "handlers/user.hpp"

Server::Server(const ServerConfig& config) : m_server_config(config) {
    if (m_server_config.m_log_level == "debug") {
        crow::logger::setLogLevel(crow::LogLevel::DEBUG);
    } else if (m_server_config.m_log_level == "info") {
        crow::logger::setLogLevel(crow::LogLevel::INFO);
    } else if (m_server_config.m_log_level == "warning") {
        crow::logger::setLogLevel(crow::LogLevel::WARNING);
    } else if (m_server_config.m_log_level == "error") {
        crow::logger::setLogLevel(crow::LogLevel::ERROR);
    } else if (m_server_config.m_log_level == "critical") {
        crow::logger::setLogLevel(crow::LogLevel::CRITICAL);
    } else {
        crow::logger::setLogLevel(crow::LogLevel::INFO);
    }

    m_app = std::make_unique<App>();

    m_db_obj = std::make_unique<Database>(m_server_config.m_db_path);

    m_db_obj->apply_migrations();

    m_user_repo = std::make_unique<UserRepository>(*m_db_obj);

    if (m_server_config.m_cors) {
        auto& cors = m_app->get_middleware<crow::CORSHandler>();
        cors.global()
            .methods(
                crow::HTTPMethod::GET,
                crow::HTTPMethod::POST,
                crow::HTTPMethod::PUT,
                crow::HTTPMethod::DELETE
            )
            .headers("Content-Type", "Authorization")
            .origin(m_server_config.m_cross_origin)
            .prefix("/api")
            .max_age(3600);
    }
}

void Server::setup() {
    this->add_handler(std::make_shared<UserHandler>("/api/user", *m_user_repo));
}

void Server::add_handler(std::shared_ptr<IHandler> handler) {
    m_handlers.push_back(handler);
    handler->register_routes(*m_app);
}

void Server::start() {
    setup();
    m_app->port(m_server_config.m_port)
        .multithreaded()
        .concurrency(m_server_config.m_threads)
        .run_async();
}
