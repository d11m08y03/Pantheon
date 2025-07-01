#pragma once

#include "handlers/base.hpp"
#include "repositories/event.hpp"

class EventHandler: public BaseHandler {
  public:
    EventHandler(const std::string& base_path, EventRepository& event_repo);
    void register_routes(App& app) override;

  private:
    EventRepository& m_event_repo;

    crow::response create(
        const std::string& name,
        const std::string description,
        bool is_active = false
    );
    crow::response find_by_id(long long id);
    crow::response set_as_active(long long id);
    crow::response remove(long long id);
};
