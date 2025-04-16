#pragma once

#include <crow.h>
#include <crow/app.h>
#include <crow/middlewares/cors.h>

using App = crow::App<crow::CORSHandler>;

class IHandler {
  public:
    virtual void register_routes(App& app) = 0;
};
