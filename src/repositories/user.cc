#include "repositories/user.hpp"

#include <iostream>

UserRepository::UserRepository(Database& db_obj) : m_db_obj(db_obj) {}

bool UserRepository::create(Models::User& user) {
    if (user.m_name.empty() || user.m_email.empty()
        || user.m_password_hash.empty()) {
        std::cerr
            << "Error creating user: Name, Email, and Password Hash cannot be empty."
            << std::endl;
        return false;
    }

    if (user.m_id.has_value()) {
        std::cerr
            << "Error creating user: User object already has an ID assigned."
            << std::endl;
        return false;
    }

    const std::string sql =
        "INSERT INTO TblUser (Name, Email, Password) VALUES (?, ?, ?);";
    const std::vector<std::string> params =
        {user.m_name, user.m_email, user.m_password_hash};

    try {
        m_db_obj.execute(sql, params);
        auto createdUser = find_by_email(user.m_email);
        if (createdUser) {
            user.m_id = createdUser->m_id;
        } else {
            std::cerr
                << "Error creating user: Failed to retrieve ID after insert for email "
                << user.m_email << std::endl;
            return false;
        }
        return true;
    } catch (const DatabaseException& e) {
        std::cerr << "Error creating user with email " << user.m_email << ": "
                  << e.what() << " (SQLite Code: " << e.getSqliteErrorCode()
                  << ")" << std::endl;
        if (e.getSqliteErrorCode() == SQLITE_CONSTRAINT_UNIQUE
            || e.getSqliteErrorCode() == SQLITE_CONSTRAINT) {
            std::cerr << "  -> Likely duplicate email address." << std::endl;
        }
        return false;
    }
}

std::optional<Models::User> UserRepository::find_by_id(long long id) {
    const std::string sql =
        "SELECT ID, Name, Email, Password FROM TblUser WHERE ID = ?;";
    std::vector<Models::User> results;

    try {
        m_db_obj.query(
            sql,
            {std::to_string(id)},
            [&results](int argc, char** argv, char** azColName) -> int {
                try {
                    results.push_back(map_row_to_user(argc, argv, azColName));
                } catch (const std::exception& e) {
                    std::cerr << "Error mapping row in findById("
                              << (argv && argv[0] ? argv[0] : "N/A")
                              << "): " << e.what() << std::endl;
                }
                return 0;
            }
        );
    } catch (const DatabaseException& e) {
        std::cerr << "Error finding user by ID " << id << ": " << e.what()
                  << " (SQLite Code: " << e.getSqliteErrorCode() << ")"
                  << std::endl;
        return std::nullopt;
    }

    if (results.empty()) {
        return std::nullopt;
    }

    return results[0];
}

std::optional<Models::User>
UserRepository::find_by_email(const std::string& email) {
    const std::string sql =
        "SELECT ID, Name, Email, Password FROM TblUser WHERE Email = ?;";
    std::vector<Models::User> results;

    try {
        m_db_obj.query(
            sql,
            {email},
            [&results](int argc, char** argv, char** azColName) -> int {
                try {
                    results.push_back(map_row_to_user(argc, argv, azColName));
                } catch (const std::exception& e) {
                    std::cerr << "Error mapping row in findByEmail("
                              << (argv && argv[2] ? argv[2] : "N/A")
                              << "): " << e.what() << std::endl;
                }
                return 0;
            }
        );
    } catch (const DatabaseException& e) {
        std::cerr << "Error finding user by email " << email << ": " << e.what()
                  << " (SQLite Code: " << e.getSqliteErrorCode() << ")"
                  << std::endl;
        return std::nullopt;
    }

    if (results.empty()) {
        return std::nullopt;
    } else {
        return results[0];
    }
}

bool UserRepository::update(const Models::User& user) {
    if (!user.m_id.has_value()) {
        std::cerr << "Error updating user: ID is missing." << std::endl;
        return false;
    }

    if (user.m_name.empty() || user.m_email.empty()
        || user.m_password_hash.empty()) {
        std::cerr
            << "Error updating user: Name, Email, and Password Hash cannot be empty."
            << std::endl;
        return false;
    }

    const std::string sql = R"(
        UPDATE TblUser
        SET Name = ?, Email = ?, Password = ?
        WHERE ID = ?;
    )";
    const std::vector<std::string> params = {
        user.m_name,
        user.m_email,
        user.m_password_hash,
        std::to_string(user.m_id.value())
    };

    try {
        m_db_obj.execute(sql, params);
        return true;
    } catch (const DatabaseException& e) {
        std::cerr << "Error updating user with ID " << user.m_id.value() << ": "
                  << e.what() << " (SQLite Code: " << e.getSqliteErrorCode()
                  << ")" << std::endl;
        if (e.getSqliteErrorCode() == SQLITE_CONSTRAINT_UNIQUE
            || e.getSqliteErrorCode() == SQLITE_CONSTRAINT) {
            std::cerr << "  -> Likely duplicate email address during update."
                      << std::endl;
        }
        return false;
    }
}

bool UserRepository::remove(long long id) {
    const std::string sql = "DELETE FROM TblUser WHERE ID = ?;";
    try {
        m_db_obj.execute(sql, {std::to_string(id)});
        return true;
    } catch (const DatabaseException& e) {
        std::cerr << "Error deleting user with ID " << id << ": " << e.what()
                  << " (SQLite Code: " << e.getSqliteErrorCode() << ")"
                  << std::endl;
        return false;
    }
}

Models::User
UserRepository::map_row_to_user(int argc, char** argv, char** az_col_name) {
    Models::User user;
    bool id_found = false;

    for (int i = 0; i < argc; ++i) {
        if (argv[i] == nullptr)
            continue; // Skip NULL values from DB

        std::string colName = az_col_name[i];
        std::string colValue = argv[i];

        if (colName == "ID") {
            user.m_id = std::stoll(colValue);
            id_found = true;
        } else if (colName == "Name") {
            user.m_name = colValue;
        } else if (colName == "Email") {
            user.m_email = colValue;
        } else if (colName == "Password") {
            user.m_password_hash = colValue;
        }
    }

    if (!id_found) {
        throw std::runtime_error(
            "Failed to map row to User: Missing 'ID' column."
        );
    }

    if (user.m_name.empty() || user.m_email.empty()
        || user.m_password_hash.empty()) {
        std::cerr << "Warning: Mapped user (ID: " << user.m_id.value()
                  << ") has empty fields." << std::endl;
    }

    return user;
}
