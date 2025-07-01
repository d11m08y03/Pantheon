#pragma once

#include "base.hpp"
#include "database.hpp"
#include "models/event.hpp"

class EventRepository: public BaseRepository<Models::Event> {
  public:
    explicit EventRepository(Database& db_obj) : BaseRepository(db_obj) {}

  protected:
    std::string
    generate_insert_query(const Models::Event& event) const override {
        return "INSERT INTO events (name, description) VALUES ('" + event.m_name
            + "', '" + event.m_description + "');";
    }

    std::string generate_select_query_by_id(long long id) const override {
        return "SELECT * FROM events WHERE id = " + std::to_string(id) + ";";
    }

    std::string
    generate_update_query(const Models::Event& event) const override {
        std::string active = event.m_active == true ? "1" : "0";
        return "UPDATE events SET name = '" + event.m_name
            + "', description = '" + event.m_description + "', active = "
            + active + "' WHERE id = " + std::to_string(*event.m_id) + ";";
    }

    std::string generate_delete_query_by_id(long long id) const override {
        return "DELETE FROM events WHERE id = " + std::to_string(id) + ";";
    }

    Models::Event map_row_to_entity(
        int argc,
        char** argv,
        char** az_col_name
    ) const override {
        Models::Event event;
        for (int i = 0; i < argc; ++i) {
            std::string column_name = az_col_name[i];
            std::string value = argv[i] ? argv[i] : "";

            if (column_name == "id")
                event.m_id = std::stoll(value);
            else if (column_name == "name")
                event.m_name = value;
            else if (column_name == "active")
                event.m_active = value == "1" ? true : false;
        }
        return event;
    }
};
