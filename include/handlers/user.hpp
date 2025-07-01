#pragma once

#include "handlers/base.hpp"
#include "repositories/user.hpp"

class UserHandler: public BaseHandler {
  public:
    UserHandler(const std::string& base_path, UserRepository& user_repo);
    void register_routes(App& app) override;

  private:
    UserRepository& m_user_repo;

    crow::response login(const std::string& email, const std::string& password);
    crow::response genesis(
        const std::string& name,
        const std::string& email,
        const std::string& password
    );
};
