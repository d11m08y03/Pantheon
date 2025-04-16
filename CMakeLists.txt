cmake_minimum_required(VERSION 4.0)
project(pantheon)

set(CMAKE_CXX_STANDARD 17)

find_package(Crow REQUIRED)
find_package(ZLIB REQUIRED)
find_package(OpenSSL REQUIRED)
find_package(CURL REQUIRED) 

find_package(bcrypt QUIET)
find_package(SQLite3 QUIET)
find_package(jwt-cpp QUIET)

if (NOT bcrypt_FOUND)
    message(STATUS "bcrypt not found, fetching and building bcrypt-cpp...")

    include(FetchContent)

    FetchContent_Declare(
        bcrypt-cpp
        GIT_REPOSITORY https://github.com/d11m08y03/Bcrypt.cpp.git
        GIT_SHALLOW TRUE
    )

    FetchContent_MakeAvailable(bcrypt-cpp)

    include_directories(${bcrypt-cpp_INCLUDE_DIR})
    link_directories(${bcrypt-cpp_BINARY_DIR})

    set(BCRYPT_LIBRARY bcrypt)
endif()

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

    include_directories(${sqlite3_SOURCE_DIR})
    link_directories(${sqlite3_BINARY_DIR})
endif()

if(NOT jwt-cpp_FOUND)
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

include(FetchContent)

FetchContent_Declare(
    Catch2
    GIT_REPOSITORY https://github.com/catchorg/Catch2.git
    GIT_TAG v3.8.1
)

FetchContent_MakeAvailable(Catch2)

add_executable(
    ${PROJECT_NAME}
    src/main.cc
    src/database.cc
    src/server.cc
    src/handlers/base.cc
    src/handlers/user.cc
    src/repositories/user.cc
)

target_link_libraries(
    ${PROJECT_NAME}
    PUBLIC Crow::Crow
    PUBLIC OpenSSL::SSL OpenSSL::Crypto
    PUBLIC z
    PUBLIC jwt-cpp
    PUBLIC bcrypt
    PUBLIC SQLite::SQLite3
)

target_include_directories(
    ${PROJECT_NAME}
    PUBLIC ${PROJECT_SOURCE_DIR}/include
)

add_executable(
    integration_tests
    tests/main_test.cc
    tests/user_handlers.cc
)

target_link_libraries(
    integration_tests
    PRIVATE Catch2::Catch2
	PRIVATE curl
)

target_include_directories(
    integration_tests
    PUBLIC ${PROJECT_SOURCE_DIR}/include
)

include(CTest)
include(Catch)
catch_discover_tests(integration_tests)
