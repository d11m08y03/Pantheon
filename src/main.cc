#include "database.hpp"
#include "models.hpp"

int main() {
    Database db("./app.db", true);
    db.ApplyMigrations();

    User test = {
        .m_name = "John",
        .m_email = "johnemail.com",
        .m_password = "john123ssssssssssss4"
    };

    db.CreateUser(test);

    db.GetUserByEmail("johnemail.com");

    return 0;
}
