cmake_minimum_required(VERSION 3.10)
project(pantheon)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

include_directories(${CMAKE_SOURCE_DIR}/include)

set(
    SOURCES
    src/main.cc
    src/database.cc
    src/statement.cc
)

find_package(SQLite3 QUIET)

if (NOT SQLite3_FOUND)
    message(STATUS "SQLite3 not found, fetching and building SQLite3...")

    include(FetchContent)

    FetchContent_Declare(
        sqlite3
        GIT_REPOSITORY https://github.com/sqlite/sqlite.git
        GIT_TAG trunk
    )

    FetchContent_MakeAvailable(sqlite3)

    include_directories(${sqlite3_SOURCE_DIR})
    link_directories(${sqlite3_BINARY_DIR})
endif()

add_executable(${PROJECT_NAME} ${SOURCES})

target_link_libraries(${PROJECT_NAME} SQLite::SQLite3)
