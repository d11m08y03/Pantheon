#include <exception>
#include <memory>

#include "server.hpp"

int main() {
    try {
        ServerConfig config;
        auto server = std::make_unique<Server>(config);
        server->start();
        return 0;
    } catch (const std::exception& e) {
        std::cerr << e.what() << '\n';
        return -1;
    }
}
