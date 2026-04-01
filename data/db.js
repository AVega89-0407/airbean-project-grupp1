import Database from "better-sqlite3";

const db = new Database("./data/airbean.db",);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    userId TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    createdAt TEXT
);

CREATE TABLE IF NOT EXISTS orders (
    orderId TEXT PRIMARY KEY,
    eta     INTEGER NOT NULL,
    total   REAL NOT NULL,
    userId  TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

export default db;