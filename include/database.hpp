#pragma once

#include <sqlite3.h>

#include <functional>
#include <mutex>
#include <optional>
#include <stdexcept>
#include <string>
#include <vector>

class DatabaseException: public std::runtime_error {
  public:
    DatabaseException(const std::string& msg, int sqlite_errcode = -1) :
        std::runtime_error(msg),
        errcode(sqlite_errcode) {}

    int getSqliteErrorCode() const {
        return errcode;
    }

  private:
    int errcode;
};

class Database {
  public:
    explicit Database(const std::string& filepath);
    ~Database() noexcept;

    Database(const Database&) = delete;
    Database& operator=(const Database&) = delete;
    Database(Database&& other) noexcept;
    Database& operator=(Database&& other) noexcept;

    void execute(
        const std::string& sql,
        const std::vector<std::string>& params = {}
    );

    int query(
        const std::string& sql,
        const std::vector<std::string>& params,
        std::function<int(int argc, char** argv, char** az_col_name)>
            row_callback
    );

    std::optional<std::string> query_single_value(
        const std::string& sql,
        const std::vector<std::string>& params = {}
    );

    void apply_migrations(const std::string& folder = "./migrations");

  private:
    sqlite3* m_db = nullptr;
    std::string m_filepath;
    std::mutex m_mutex;

    void check_error(int rc, const std::string& context = "");

    void prepare_and_bind(
        sqlite3_stmt** stmt,
        const std::string& sql,
        const std::vector<std::string>& params
    );
};
