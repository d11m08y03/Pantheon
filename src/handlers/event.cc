#include "handlers/event.hpp"

#include "handlers/base.hpp"
#include "models/event.hpp"

EventHandler::EventHandler(
    const std::string& base_path,
    EventRepository& event_repo
) :
    BaseHandler(base_path),
    m_event_repo(event_repo) {}

crow::response EventHandler::create(
    const std::string& name,
    const std::string description,
    bool is_active
) {
    Models::Event event(name, description, is_active);
    bool created = m_event_repo.create(event);

    if (!created) {
        return BaseHandler::internal_err("Failed to create event");
    }

    return crow::response(crow::status::CREATED, "Event created");
}

crow::response EventHandler::find_by_id(long long id) {
    auto event = m_event_repo.find_by_id(id);
    if (!event) {
        return BaseHandler::not_found_err("User not found");
    }

    crow::json::wvalue resp;
    resp["id"] = event->m_id.value_or(0);
    resp["name"] = event->m_name;
    resp["description"] = event->m_description;

    return crow::response(crow::FOUND, resp);
}

crow::response EventHandler::set_as_active(long long id) {
    return BaseHandler::internal_err("Unimplemented");
}

crow::response EventHandler::remove(long long id) {
    bool deleted = m_event_repo.remove(id);

    if (!deleted) {
        return BaseHandler::internal_err("Failed to delete event");
    }

    return crow::response(crow::status::OK, "Event deleted");
}

void EventHandler::register_routes(App& app) {
    const std::string create_path = m_base_path + "/create";
    const std::string find_path = m_base_path + "/find";
    const std::string set_as_active_path = m_base_path + "/set-as-active";
    const std::string remove_path = m_base_path + "/remove";
}
