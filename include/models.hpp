#pragma once

#include <sqlite3.h>

#include <string>

struct User {
    int m_id;
    std::string m_name;
    std::string m_email;
    std::string m_password;

    void Map(sqlite3_stmt* stmt);
};
