CREATE TABLE IF NOT EXISTS TblAdmin (
	ID INTEGER PRIMARY KEY AUTOINCREMENT,
	UserID INTEGER NOT NULL,
	FOREIGN KEY(UserID) REFERENCES TblUser(ID)
)
