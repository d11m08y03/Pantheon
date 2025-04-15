#include "base.hpp"
#include "crow.h"
#include "database.hpp"
#include "models.hpp"

class GenesisRoutes: public BaseHandler {
  private:
    Database& m_db;

  public:
    explicit GenesisRoutes(Database& db);
    void RegisterRoutes(crow::SimpleApp& app) override;
};
