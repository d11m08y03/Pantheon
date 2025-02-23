#include "server.hpp"

#include "crow/app.h"
#include "crow/logging.h"

Server::Server(int port) : m_port(port) {
    SetupRoutes();
};

void Server::SetupRoutes() {
    CROW_ROUTE(m_app, "/")([]() { return "Hello"; });
}

void Server::Run() {
    CROW_LOG_INFO << "Server started on port " << m_port << "\n";
    m_app.port(m_port).multithreaded().run();
}
