import crypto from 'crypto';
import db from '../data/db.js';
import menu from '../menu/menu.js';
import { calculateTotal } from '../services/discountService.js';

export function createOrder(req, res) {
    const {items, userId} = req.body;

    // Beräknar totalpris med kampanjrabatter
    const { baseTotal, total, discountTotal, applied } = calculateTotal(items, menu);

// Genererar unikt order-ID och beräknar ETA
const orderId = crypto.randomUUID();
const eta = Math.floor(Math.random() *10) + 5 + items.length * 2;
const createdAt = new Date().toISOString();

try{
    // Sparar ordern i databasen
    const stmt = db.prepare(`
        INSERT INTO orders (orderId, eta, total, userId, createdAt)
        VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(orderId, eta, total, userId || null, createdAt);

    const newOrder = db.prepare('SELECT orderId, eta, total, userId, createdAt FROM orders WHERE orderId = ?').get(orderId);

// Returnerar den skapade ordern med ETA-meddelande och rabattinfo
res.status(201).json({
    newOrder,
    baseTotal,
    discountTotal,
    appliedDiscounts: applied,
    message: `Order mottagen! Din beställning kommer att vara klar om ca ${eta} minuter.`
});
}
    catch (err) {
    console.error("POST /orders:", err);
    res.status(500).json({ fel: "Kunde inte skapa order" });
}
}
