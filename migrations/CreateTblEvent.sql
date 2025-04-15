CREATE TABLE IF NOT EXISTS TblEvent (
	ID INTEGER PRIMARY KEY AUTOINCREMENT,
	Name VARCHAR(255) NOT NULL,
	Description TEXT NOT NULL,
	Active BIT DEFAULT 0,
)
