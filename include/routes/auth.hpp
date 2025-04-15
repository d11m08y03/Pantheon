#pragma once 

#include "crow.h"
#include "base.hpp"
#include "database.hpp"

class AuthRoutes : public BaseHandler {
private:
    Database& m_db;

public:
    explicit AuthRoutes(Database& db);
    void RegisterRoutes(crow::SimpleApp& app) override;
};

// http://cc.com/api/login
