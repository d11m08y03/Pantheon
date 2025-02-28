#include "crow.h"
#include "database.hpp"

class Server {
  private:
    crow::SimpleApp m_app;
    std::unique_ptr<Database> m_db;
    int m_port;

    void SetupRoutes();
    void ValidateJWT(const std::string& token);

  public:
    Server(int port = 8080);
    void Run();
};
