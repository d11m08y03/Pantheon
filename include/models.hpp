#pragma once

#include <sqlite3.h>

#include <string>

struct User {
    std::string name;
    std::string email;
    std::string password;

    void Map(sqlite3_stmt* stmt) {
        name = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 0));
        email = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
        password = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
    }
};
