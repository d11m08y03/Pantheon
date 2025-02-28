#include <sqlite3.h>

#include <optional>
#include <stdexcept>
#include <string>

class Statement {
  private:
    sqlite3_stmt* m_stmt;

  public:
    explicit Statement(sqlite3* db, const std::string& query);

    sqlite3_stmt* Get() const;

    template<typename... Args>
    void BindParameters(sqlite3* db, Args... args) {
        int index = 1;
        (([&]() {
             if constexpr (std::is_same_v<std::decay_t<Args>, std::string>) {
                 if (sqlite3_bind_text(
                         m_stmt,
                         index++,
                         args.c_str(),
                         -1,
                         SQLITE_TRANSIENT // This is evil. Never use SQLITE_STATIC with non literal strings.
                     )
                     != SQLITE_OK) {
                     throw std::runtime_error(
                         "Failed to bind parameter: "
                         + std::string(sqlite3_errmsg(db))
                     );
                 }
             } else if constexpr (std::is_same_v<std::decay_t<Args>, int>) {
                 if (sqlite3_bind_int(m_stmt, index++, args) != SQLITE_OK) {
                     throw std::runtime_error(
                         "Failed to bind parameter: "
                         + std::string(sqlite3_errmsg(db))
                     );
                 }
             }
         })(),
         ...);
    }

    void ExecuteInsert(sqlite3* db);

    template<typename T>
    std::optional<T> ExecuteGet(sqlite3* db) {
        int result = sqlite3_step(m_stmt);

        if (result == SQLITE_ROW) {
            T model;
            model.Map(m_stmt);
            return model;
        }

        if (result == SQLITE_DONE || result == SQLITE_EMPTY) {
            return std::nullopt;
        }

        throw std::runtime_error(
            "SQLite error: " + std::string(sqlite3_errmsg(db))
        );
    }

    ~Statement();
};
