CREATE TABLE IF NOT EXISTS TblUser (
	ID INTEGER PRIMARY KEY AUTOINCREMENT,
	Name TEXT NOT NULL,
	Email TEXT NOT NULL UNIQUE,
	Password TEXT NOT NULL
)
