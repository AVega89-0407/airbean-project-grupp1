import { Router } from "express";
import db from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

import { createOrder } from "../controllers/orderController.js";
import { OrderValidator } from "../middleware/orderValidator.js";

const router = Router();

router.get("/", (_req, res) => {
try {
    const orders = db.prepare("SELECT orderId, eta, total, userId, createdAt FROM orders").all();
    res.json(orders);
} catch (err) {
    console.error("GET /orders:", err);
    res.status(500).json({ fel: "Kunde inte hämta order" });
}
});

router.get('/status/:orderId', (req, res) => {
    const { orderId } = req.params;

        const order = db.prepare(`
            SELECT orderId, eta, total, userId, createdAt
            FROM orders
            WHERE orderId = ?
        `).get(orderId);

    // Om ingen order hittas — returnera 404
    if (!order) {
        return res.status(404).json({ error: 'Order hittades inte' });
    }

    // Returnera orderns status och relevant information
    res.json({
        orderId: order.orderId,
        eta: order.eta,
        createdAt: order.createdAt,
        total: order.total,
    });
});

router.post('/', OrderValidator, createOrder, (req, res) => {

    const createdAt = new Date().toISOString();
    const orderId = uuidv4();

const stmt = db.prepare(`
    INSERT INTO orders (orderId, eta, total, userId, createdAt)
    VALUES (?, ?, ?, ?, ?)
`);
    stmt.run(orderId, eta, total, userId, createdAt);

const newOrder = db.prepare('SELECT orderId, eta, total, userId, createdAt FROM orders WHERE orderId = ?').get(orderId);
    res.status(201).json(newOrder);
});

export default router;