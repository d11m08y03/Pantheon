#include "database.hpp"

#include <sqlite3.h>

#include <filesystem>
#include <fstream>
#include <iostream>
#include <utility>

Database::Database(const std::string& filepath) : m_filepath(filepath) {
    int flags =
        SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE | SQLITE_OPEN_NOMUTEX;
    int rc = sqlite3_open_v2(m_filepath.c_str(), &m_db, flags, nullptr);

    if (rc != SQLITE_OK) {
        std::string errMsg = "Cannot open/create database '" + m_filepath
            + "': " + sqlite3_errmsg(m_db);
        sqlite3_close(m_db);
        m_db = nullptr;
        throw DatabaseException(errMsg, rc);
    }
}

Database::~Database() noexcept {
    if (m_db) {
        int rc = sqlite3_close(m_db);
        if (rc != SQLITE_OK) {
            std::cerr << "Error closing database: " << sqlite3_errmsg(m_db)
                      << std::endl;
        }
        m_db = nullptr;
    }
}

Database::Database(Database&& other) noexcept :
    m_db(other.m_db),
    m_filepath(std::move(other.m_filepath)) {
    other.m_db = nullptr;
}

Database& Database::operator=(Database&& other) noexcept {
    if (this != &other) {
        // Release existing resource if any
        if (m_db) {
            sqlite3_close(m_db);
        }

        // Transfer ownership
        m_db = other.m_db;
        m_filepath = std::move(other.m_filepath);

        // Reset other
        // Mutex remains associated with the current object instance.
        other.m_db = nullptr;
    }
    return *this;
}

void Database::execute(
    const std::string& sql,
    const std::vector<std::string>& params
) {
    std::lock_guard<std::mutex> lock(m_mutex);
    sqlite3_stmt* stmt = nullptr;

    try {
        prepare_and_bind(&stmt, sql, params);

        int rc = sqlite3_step(stmt);
        if (rc != SQLITE_DONE) {
            check_error(rc, "Failed to execute statement fully");
        }

        sqlite3_finalize(stmt);
    } catch (...) {
        if (stmt) {
            sqlite3_finalize(stmt);
        }
        throw;
    }
}

int Database::query(
    const std::string& sql,
    const std::vector<std::string>& params,
    std::function<int(int argc, char** argv, char** az_col_name)> row_callback
) {
    std::lock_guard<std::mutex> lock(m_mutex);
    sqlite3_stmt* stmt = nullptr;
    int rows_processed = 0;
    int callback_result = 0;

    try {
        prepare_and_bind(&stmt, sql, params);

        int rc;
        while ((rc = sqlite3_step(stmt)) == SQLITE_ROW) {
            rows_processed++;
            int col_count = sqlite3_column_count(stmt);

            std::vector<char*> argv_vec;
            std::vector<char*> col_names_vec;
            argv_vec.reserve(col_count);
            col_names_vec.reserve(col_count);

            for (int i = 0; i < col_count; ++i) {
                argv_vec.push_back(reinterpret_cast<char*>(
                    const_cast<unsigned char*>(sqlite3_column_text(stmt, i))
                ));
                col_names_vec.push_back(
                    const_cast<char*>(sqlite3_column_name(stmt, i))
                );
            }

            if (row_callback) {
                callback_result = row_callback(
                    col_count,
                    argv_vec.data(),
                    col_names_vec.data()
                );
                if (callback_result != 0) {
                    break;
                }
            }
        }

        if (rc != SQLITE_DONE && callback_result == 0) {
            check_error(rc, "Query execution failed after processing rows");
        }

        sqlite3_finalize(stmt);
        return rows_processed;

    } catch (...) {
        if (stmt) {
            sqlite3_finalize(stmt);
        }
        throw; // Re-throw any exception caught
    }
}

std::optional<std::string> Database::query_single_value(
    const std::string& sql,
    const std::vector<std::string>& params
) {
    std::lock_guard<std::mutex> lock(m_mutex);
    sqlite3_stmt* stmt = nullptr;
    std::optional<std::string> result = std::nullopt;

    try {
        prepare_and_bind(&stmt, sql, params);

        int rc = sqlite3_step(stmt);

        if (rc == SQLITE_ROW) {
            if (sqlite3_column_count(stmt) > 0) {
                const char* text =
                    reinterpret_cast<const char*>(sqlite3_column_text(stmt, 0));
                if (text) {
                    result = std::string(text);
                } else {
                    result = std::nullopt;
                }

            } else {
                sqlite3_finalize(stmt);
                throw DatabaseException(
                    "Query for single value returned no columns",
                    SQLITE_MISUSE
                );
            }

            if (rc != SQLITE_DONE) {
                rc = sqlite3_step(stmt);
                if (rc != SQLITE_DONE) {
                    check_error(
                        rc,
                        "Query for single value failed after retrieving row"
                    );
                }
            }

        } else if (rc == SQLITE_DONE) {
            result = std::nullopt;
        } else {
            check_error(rc, "Query for single value failed on first step");
        }

        sqlite3_finalize(stmt);
        return result;

    } catch (...) {
        if (stmt) {
            sqlite3_finalize(stmt);
        }
        throw;
    }
}

void Database::apply_migrations(const std::string& folder) {
    auto exec_file = [this](const std::string& filepath) {
        std::ifstream file(filepath);
        if (!file.is_open()) {
            throw std::runtime_error("Failed to open SQL file: " + filepath);
        }

        std::string query(
            (std::istreambuf_iterator<char>(file)),
            std::istreambuf_iterator<char>()
        );

        std::cout << "Executing migration: " << filepath << std::endl;
        this->execute(query);
    };

    for (const auto& file : std::filesystem::directory_iterator(folder)) {
        std::string filename = file.path().filename().string();

        if (!file.is_regular_file() || file.path().extension() != ".sql") {
            continue;
        }

        exec_file(file.path().string());
    }
}

void Database::check_error(int rc, const std::string& context) {
    if (rc != SQLITE_OK && rc != SQLITE_ROW && rc != SQLITE_DONE) {
        std::string errMsg = context.empty() ? "" : (context + ": ");
        errMsg += "SQLite error [" + std::to_string(rc)
            + "]: " + sqlite3_errmsg(m_db);
        throw DatabaseException(errMsg, rc);
    }
}

void Database::prepare_and_bind(
    sqlite3_stmt** stmt,
    const std::string& sql,
    const std::vector<std::string>& params
) {
    int rc = sqlite3_prepare_v2(m_db, sql.c_str(), -1, stmt, nullptr);
    check_error(rc, "Failed to prepare statement");

    if (*stmt == nullptr) {
        throw DatabaseException(
            "Prepared statement handle is null (invalid SQL?)",
            SQLITE_ERROR
        );
    }

    for (int i = 0; i < params.size(); ++i) {
        rc = sqlite3_bind_text(
            *stmt,
            i + 1,
            params[i].c_str(),
            -1,
            SQLITE_TRANSIENT
        );
        check_error(rc, "Failed to bind parameter #" + std::to_string(i + 1));
    }
}
