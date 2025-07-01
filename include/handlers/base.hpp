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

    static crow::response created(const std::string& msg);
    static crow::response success(const std::string& msg);

    static crow::response validate_incoming_payload(
        const crow::json::rvalue& payload,
        const std::unordered_map<std::string, std::string>& required_fields
    );
};
