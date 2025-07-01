cmake_minimum_required(VERSION 3.15)
project(pantheon)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

find_package(Crow REQUIRED)
find_package(ZLIB REQUIRED)
find_package(OpenSSL REQUIRED)
find_package(CURL REQUIRED)

# bcrypt dependency
find_package(bcrypt QUIET)
if (NOT bcrypt_FOUND)
    message(STATUS "bcrypt not found, fetching and building bcrypt-cpp...")
    include(FetchContent)
    FetchContent_Declare(
        bcrypt-cpp
        GIT_REPOSITORY https://github.com/d11m08y03/Bcrypt.cpp.git
        GIT_SHALLOW TRUE
    )
    FetchContent_MakeAvailable(bcrypt-cpp)
endif()

FetchContent_Declare(
    nlohmann_json
    GIT_REPOSITORY https://github.com/nlohmann/json.git
    GIT_TAG v3.12.0
    GIT_SHALLOW TRUE
)

# SQLite3 dependency
find_package(SQLite3 QUIET)
if (NOT SQLite3_FOUND)
    message(STATUS "SQLite3 not found, fetching and building SQLite3...")
    include(FetchContent)
    FetchContent_Declare(
        sqlite3
        GIT_REPOSITORY https://github.com/sqlite/sqlite.git
        GIT_TAG trunk
        GIT_SHALLOW TRUE
    )
    FetchContent_MakeAvailable(sqlite3)
endif()

# jwt-cpp dependency
find_package(jwt-cpp QUIET)
if (NOT jwt-cpp_FOUND)
    message(STATUS "JWT library not found. Fetching and building jwt-cpp...")
    include(FetchContent)
    FetchContent_Declare(
        jwt-cpp
        GIT_REPOSITORY https://github.com/Thalhammer/jwt-cpp.git
        GIT_TAG v0.7.0
        GIT_SHALLOW TRUE
    )
    FetchContent_MakeAvailable(jwt-cpp)
endif()

# FetchContent for Catch2
include(FetchContent)
FetchContent_Declare(
    Catch2
    GIT_REPOSITORY https://github.com/catchorg/Catch2.git
    GIT_TAG v3.8.1
)
FetchContent_MakeAvailable(Catch2)

# Main application
add_executable(${PROJECT_NAME}
    src/main.cc
    src/database.cc
    src/server.cc
    src/handlers/base.cc
    src/handlers/user.cc
    src/repositories/user.cc
)

target_link_libraries(${PROJECT_NAME}
    PUBLIC Crow::Crow
    PUBLIC OpenSSL::SSL OpenSSL::Crypto
    PUBLIC z
    PUBLIC jwt-cpp
    PUBLIC bcrypt
    PUBLIC SQLite::SQLite3
)

target_include_directories(${PROJECT_NAME}
    PUBLIC ${PROJECT_SOURCE_DIR}/include
)

# Integration tests
add_executable(integration_tests
    tests/main_test.cc
    tests/user_handlers.cc
)

target_link_libraries(integration_tests
    PRIVATE Catch2::Catch2
    PRIVATE curl
)

target_include_directories(integration_tests
    PUBLIC ${PROJECT_SOURCE_DIR}/include
)

include(CTest)
include(Catch)
catch_discover_tests(integration_tests)
