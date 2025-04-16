#pragma once

#include <optional>
#include <string>

namespace Models {

struct User {
    std::optional<long long> m_id;
    std::string m_name;
    std::string m_email;
    std::string m_password_hash;

    User(std::string n, std::string e, std::string ph) :
        m_name(std::move(n)),
        m_email(std::move(e)),
        m_password_hash(std::move(ph)) {}

    User() = default;
};

} // namespace Models
