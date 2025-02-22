#include "database.hpp"
#include "models.hpp"

int main() {
    Database db("./app.db", true);
    db.ApplyMigrations();

    User test =
        {.name = "John", .email = "johnemail.com", .password = "john1234"};

    db.CreateUser(test);

		db.GetUserByEmail("johnemail.com");

    return 0;
}
