#include <optional>

#include "database.hpp"
#include "models/user.hpp"

class UserRepository {
  public:
    explicit UserRepository(Database& db_obj);

    bool create(Models::User& user);
    std::optional<Models::User> find_by_id(long long id);
    std::optional<Models::User> find_by_email(const std::string& email);
    bool update(const Models::User& user);
    bool remove(long long id);

  private:
    Database& m_db_obj;

    static Models::User
    map_row_to_user(int argc, char** argv, char** az_col_name);
};
