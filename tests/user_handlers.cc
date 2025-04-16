#include <curl/curl.h>
#include <catch2/catch_all.hpp>
#include <stdexcept>
#include <string>
#include <sstream>

struct HttpResponse {
    long status_code;
    std::string body;
};

HttpResponse perform_http_request(
    const std::string& url,
    const std::string& method,
    const std::string& payload = ""
) {
    CURL* curl = curl_easy_init();
    if (!curl) {
        throw std::runtime_error("Failed to initialize cURL");
    }

    HttpResponse response;
    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, method.c_str());

    if (!payload.empty()) {
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());
        struct curl_slist* headers = nullptr;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    }

    // Capture response
    curl_easy_setopt(
        curl,
        CURLOPT_WRITEFUNCTION,
        +[](void* data, size_t size, size_t nmemb, void* userp) -> size_t {
            ((std::string*)userp)->append((char*)data, size * nmemb);
            return size * nmemb;
        }
    );
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response.body);

    CURLcode res = curl_easy_perform(curl);
    if (res != CURLE_OK) {
        std::string err = curl_easy_strerror(res);
        curl_easy_cleanup(curl);
        throw std::runtime_error("cURL request failed: " + err);
    }

    // Get the status code
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &response.status_code);

    curl_easy_cleanup(curl);
    return response;
}

TEST_CASE("Test /api/user/register endpoint", "[integration]") {
    const std::string url = "http://localhost:8080/api/user/register";
    const std::string payload =
        R"({"name":"Adam","email": "newuser@example.com", "password": "abcd1234"})";

    HttpResponse response;
    REQUIRE_NOTHROW(response = perform_http_request(url, "POST", payload));
    REQUIRE(response.status_code == 201);
}

TEST_CASE("Test /api/user/login endpoint", "[integration]") {
    const std::string url = "http://localhost:8080/api/user/login";
    const std::string payload =
        R"({"email": "newuser@example.com", "password": "abcd1234"})";

    HttpResponse response;
    REQUIRE_NOTHROW(response = perform_http_request(url, "POST", payload));
    REQUIRE(response.status_code == 200);
}
