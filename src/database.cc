#include "database.hpp"

#include <exception>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <stdexcept>
#include <string>

#include "bcrypt.h"
#include "models.hpp"
#include "statement.hpp"

Database::Database(const std::string& filepath, bool create) : m_db(nullptr) {
    if (!create) {
        std::ifstream file(filepath);
        if (!file.good()) {
            std::string err = "Error: " + filepath + " does not exist.";
            throw std::runtime_error(err);
        }
    }

    int result = sqlite3_open(filepath.c_str(), &m_db);

    if (result != SQLITE_OK) {
        std::string err = "Error opening database: ";
        err += std::string(sqlite3_errmsg(m_db));
        sqlite3_close(m_db);
        throw std::runtime_error(err);
    }

    std::cout << "Connected to database " << filepath << ". \n";
}

Database::~Database() noexcept {
    if (m_db) {
        sqlite3_close(m_db);
        std::cout << "Database closed.\n";
    }
}

void Database::ExecuteQuery(const std::string& query) {
    char* errorMessage = nullptr;
    int result =
        sqlite3_exec(m_db, query.c_str(), nullptr, nullptr, &errorMessage);
    if (result != SQLITE_OK) {
        std::string errorMsg = "SQL error: " + std::string(errorMessage);
        sqlite3_free(errorMessage);
        throw std::runtime_error(errorMsg);
    }
}

void Database::ApplyMigrations(const std::string& folder) {
    auto exec_file = [this](const std::string& filepath) {
        std::ifstream file(filepath);
        if (!file.is_open()) {
            throw std::runtime_error("Failed to open SQL file: " + filepath);
        }

        std::string query(
            (std::istreambuf_iterator<char>(file)),
            std::istreambuf_iterator<char>()
        );

        ExecuteQuery(query);
        std::cout << "Executed migration: " << filepath << std::endl;
    };

    for (const auto& file : std::filesystem::directory_iterator(folder)) {
        if (!file.is_regular_file() || file.path().extension() != ".sql") {
            continue;
        }

        std::string filename = file.path().filename().string();
        exec_file(file.path().string());
    }
}

void Database::CreateUser(const User& user) {
    try {
        Statement stmt(
            m_db,
            "INSERT INTO TblUser (Name, Email, Password) VALUES (?, ?, ?)"
        );

        std::string hash = bcrypt::generateHash(user.m_password);
        std::cout << hash << std::endl;

        stmt.BindParameters(m_db, user.m_name, user.m_email, hash);
        stmt.ExecuteInsert(m_db);
    } catch (std::exception& e) {
        std::cout << e.what() << std::endl;
    }
}

void Database::GetUserByEmail(const std::string& email) {
    try {
        Statement stmt(m_db, "SELECT * FROM TblUser WHERE Email = ?");
        stmt.BindParameters(m_db, email);
        auto user = stmt.ExecuteGet<User>(m_db);

        if (user) {
            std::cout << "User found: " << user->m_name << std::endl;
        } else {
            std::cout << "User not found" << std::endl;
        }
    } catch (std::exception& e) {
        std::cout << e.what() << std::endl;
    }
}
