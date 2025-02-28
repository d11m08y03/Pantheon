#include "statement.hpp"

#include <stdexcept>

Statement::Statement(sqlite3* db, const std::string& query) {
    if (sqlite3_prepare_v2(db, query.c_str(), -1, &m_stmt, nullptr)
        != SQLITE_OK) {
        throw std::runtime_error(
            "Failed to prepare statement: " + std::string(sqlite3_errmsg(db))
        );
    }
}

Statement::~Statement() {
    sqlite3_finalize(m_stmt);
}

sqlite3_stmt* Statement::Get() const {
    return m_stmt;
}

void Statement::ExecuteInsert(sqlite3* db) {
    int result = sqlite3_step(m_stmt);
    if (result != SQLITE_DONE) {
        std::string error_message = sqlite3_errmsg(db);
        switch (result) {
            case SQLITE_BUSY:
                throw std::runtime_error("Database is busy: " + error_message);
            case SQLITE_LOCKED:
                throw std::runtime_error(
                    "Database is locked: " + error_message
                );
            case SQLITE_CORRUPT:
                throw std::runtime_error(
                    "Database file is corrupt: " + error_message
                );
            case SQLITE_CONSTRAINT:
                throw std::runtime_error(
                    "Constraint violation: " + error_message
                );
            case SQLITE_ERROR:
                throw std::runtime_error("SQL error: " + error_message);
            default:
                throw std::runtime_error("Unknown error: " + error_message);
        }
    }
}
