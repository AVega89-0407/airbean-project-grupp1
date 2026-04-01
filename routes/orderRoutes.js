import { Router } from "express";
import db from "../data/db.js";

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

// orderhistroik för en användare
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;

    try {
        const orders = db.prepare(`
            SELECT orderId, eta, total, userId, createdAt
            FROM orders
            WHERE userId = ?
        `).all(userId);

        res.json(orders);
    } catch (err) {
        console.error("GET /orders/user/:userId:", err);
        res.status(500).json({ fel: "Kunde inte hämta order" });
    }
});

router.post('/', OrderValidator, createOrder);

export default router;