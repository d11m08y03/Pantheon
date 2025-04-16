#pragma once

#include <crow.h>

#include <memory>
#include <vector>

#include "database.hpp"
#include "handlers/interface.hpp"
#include "handlers/user.hpp"

struct ServerConfig {
    int m_port = 8080;
    std::string m_log_level = "info";
    bool m_cors = true;
    int m_threads = 2;
    std::string m_cross_origin = "*";
    std::string m_db_path = "./build/app.db";
};

class Server {
  public:
    explicit Server(const ServerConfig& config = ServerConfig());
    void start();

  private:
    ServerConfig m_server_config;
    std::unique_ptr<App> m_app;

    std::vector<std::shared_ptr<IHandler>> m_handlers;

    std::unique_ptr<Database> m_db_obj;

    std::unique_ptr<UserRepository> m_user_repo;

    void setup();
    void add_handler(std::shared_ptr<IHandler> handler);
};
