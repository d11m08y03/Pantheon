#pragma once

#include <optional>
#include <string>

namespace Models {

struct Event {
    std::optional<long long> m_id;
    std::string m_name;
    std::string m_description;
    bool m_active;

    Event(std::string n, std::string d, bool a) :
        m_name(n),
        m_description(d),
        m_active(a) {}

    Event() = default;
};

} // namespace Models
