#pragma once

#include <sqlite3.h>

#include <string>

#include "models.hpp"

class Database {
  private:
    sqlite3* m_db;
    void ExecuteQuery(const std::string& query);

  public:
    explicit Database(const std::string& filepath, bool create = false);

    void ApplyMigrations(const std::string& folder = "./migrations");

    void CreateUser(const User& user);
    void GetUserByEmail(const std::string& email);

    ~Database() noexcept;
};
