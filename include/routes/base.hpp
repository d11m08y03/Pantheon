#pragma once

#include "crow.h"

class BaseHandler {
  public:
    virtual ~BaseHandler() = default;
    virtual void RegisterRoutes(crow::SimpleApp& app) = 0;
};
