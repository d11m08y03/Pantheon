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
		src/models.cc
		src/server.cc
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
else()
		message(STATUS "SQLite3 found.")
endif()

find_library(BCRYPT_LIBRARY bcrypt)

if (BCRYPT_LIBRARY)
    message(STATUS "bcrypt found.")
else()
    message(STATUS "bcrypt not found, fetching and building bcrypt-cpp...")

    include(FetchContent)

    FetchContent_Declare(
				bcrypt-cpp
				GIT_REPOSITORY https://github.com/hilch/Bcrypt.cpp.git
				GIT_TAG V2.0_NODEBCRYPT 
				GIT_SHALLOW TRUE
    )

    FetchContent_MakeAvailable(bcrypt-cpp)

		include_directories(${bcrypt-cpp_INCLUDE_DIR})
    link_directories(${bcrypt-cpp_BINARY_DIR})

    set(BCRYPT_LIBRARY bcrypt)
endif()

find_package(Crow QUIET)

if (Crow_FOUND)
    message(STATUS "Crow library found.")
else()
    message(STATUS "Crow library not found. Fetching and building crow-cpp...")

    include(FetchContent)

    FetchContent_Declare(
        crow-cpp
        GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
        GIT_TAG v1.2.1.2
        GIT_SHALLOW TRUE
    )

    FetchContent_MakeAvailable(crow-cpp)

		include_directories(${crow-cpp_INCLUDE_DIR})
    link_directories(${crow-cpp_BINARY_DIR})
endif()

add_executable(${PROJECT_NAME} ${SOURCES})

target_link_libraries(${PROJECT_NAME} SQLite::SQLite3 ${BCRYPT_LIBRARY} Crow)
