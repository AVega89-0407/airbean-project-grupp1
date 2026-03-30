import Database from "better-sqlite3";

const dbOrders = new Database("./data/orders.db",);

dbOrders.exec(`
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_price REAL NOT NULL,
    status      TEXT,
    createdAt TEXT
);
`);

export default dbOrders;