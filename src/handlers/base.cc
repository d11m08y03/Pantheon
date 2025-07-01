#include "handlers/base.hpp"

#include <crow/json.h>

BaseHandler::BaseHandler(const std::string& base_path) :
    m_base_path(base_path) {}

crow::response BaseHandler::bad_request_err(const std::string& msg) {
    crow::json::wvalue resp;
    resp["status"] = "error";
    resp["message"] = msg;

    return crow::response(crow::BAD_REQUEST, resp);
}

crow::response BaseHandler::not_found_err(const std::string& msg) {
    crow::json::wvalue resp;
    resp["status"] = "error";
    resp["message"] = msg;

    return crow::response(crow::NOT_FOUND, resp);
}

crow::response BaseHandler::unauthorised_err(const std::string& msg) {
    crow::json::wvalue resp;
    resp["status"] = "error";
    resp["message"] = msg;

    return crow::response(crow::UNAUTHORIZED, resp);
}

crow::response BaseHandler::internal_err(const std::string& msg) {
    crow::json::wvalue resp;
    resp["status"] = "error";
    resp["message"] = msg;

    return crow::response(crow::INTERNAL_SERVER_ERROR, resp);
}

crow::response BaseHandler::success(const std::string& msg) {
    crow::json::wvalue resp;
    resp["status"] = "success";
    resp["message"] = msg;

    return crow::response(crow::OK, resp);
}

crow::response BaseHandler::created(const std::string& msg) {
    crow::json::wvalue resp;
    resp["status"] = "success";
    resp["message"] = msg;

    return crow::response(crow::CREATED, resp);
}

crow::response BaseHandler::validate_incoming_payload(
    const crow::json::rvalue& payload,
    const std::unordered_map<std::string, std::string>& required_fields
) {
    if (!payload) {
        return bad_request_err("Invalid JSON payload");
    }

    std::vector<std::string> errors;

    for (const auto& [field, expected_type] : required_fields) {
        if (!payload.has(field)) {
            errors.push_back("Missing required field: " + field);
            continue;
        }

        // Validate data type
        const auto& value = payload[field];
        bool type_match = false;

        if (expected_type == "string") {
            type_match = value.t() == crow::json::type::String;
        } else if (expected_type == "int") {
            type_match = value.t() == crow::json::type::Number;
        } else if (expected_type == "bool") {
            type_match = value.t() == crow::json::type::False
                || value.t() == crow::json::type::True;
        } else if (expected_type == "double") {
            type_match = value.t() == crow::json::type::Number;
        } else if (expected_type == "array") {
            type_match = value.t() == crow::json::type::List;
        } else if (expected_type == "object") {
            type_match = value.t() == crow::json::type::Object;
        } else {
            errors.push_back("Unknown expected type for field: " + field);
            continue;
        }

        if (!type_match) {
            errors.push_back(
                "Invalid type for field: " + field
                + " (expected: " + expected_type + ")"
            );
        }
    }

    if (!errors.empty()) {
        std::string error_message = "Payload validation failed: ";
        for (size_t i = 0; i < errors.size(); ++i) {
            error_message += errors[i];
            if (i < errors.size() - 1) {
                error_message += "; ";
            }
        }
        return bad_request_err(error_message);
    }

    return crow::response(); // Return an empty response for success
}
