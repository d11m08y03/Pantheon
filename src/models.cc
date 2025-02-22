#include "models.hpp"

void User::Map(sqlite3_stmt* stmt) {
    m_id = reinterpret_cast<const int>(sqlite3_column_int(stmt, 0));
    m_name = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 1));
    m_email = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 2));
    m_password = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 3));
}
