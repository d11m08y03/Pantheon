#pragma once

#include "interface.hpp"

class BaseHandler: public IHandler {
  public:
    explicit BaseHandler(const std::string& base_path);

  protected:
    std::string m_base_path;

    static crow::response bad_request_err(const std::string& msg);
    static crow::response not_found_err(const std::string& msg);
    static crow::response unauthorised_err(const std::string& msg);
    static crow::response internal_err(const std::string& msg);
};
