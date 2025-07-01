#include <optional>
#include <string>

#include "database.hpp"

template<typename T>
class BaseRepository {
  public:
    explicit BaseRepository(Database& db_obj) : m_db_obj(db_obj) {}

    virtual ~BaseRepository() = default;

    bool create(const T& entity) {
        std::string sql = generate_insert_query(entity);
        return execute_query(sql);
    }

    std::optional<T> find_by_id(long long id) {
        std::string sql = generate_select_query_by_id(id);
        return fetch_single_entity(sql);
    }

    bool update(const T& entity) {
        std::string sql = generate_update_query(entity);
        return execute_query(sql);
    }

    bool remove(long long id) {
        std::string sql = generate_delete_query_by_id(id);
        return execute_query(sql);
    }

  protected:
    Database& m_db_obj;

    virtual std::string generate_insert_query(const T& entity) const = 0;
    virtual std::string generate_select_query_by_id(long long id) const = 0;
    virtual std::string generate_update_query(const T& entity) const = 0;
    virtual std::string generate_delete_query_by_id(long long id) const = 0;
    virtual T
    map_row_to_entity(int argc, char** argv, char** az_col_name) const = 0;

    void execute_query(const std::string& sql) {
        return m_db_obj.execute(sql);
    }

    std::optional<T> fetch_single_entity(const std::string& sql) {
        std::optional<T> result;
        m_db_obj.query(
            sql,
            [&result, this](int argc, char** argv, char** az_col_name) {
                result = map_row_to_entity(argc, argv, az_col_name);
            }
        );
        return result;
    }
};
