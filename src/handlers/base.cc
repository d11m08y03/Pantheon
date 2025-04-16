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
