import { Router } from "express";
import dbOrders from "../data/dbOrders.js";
import { v4 as uuidv4 } from "uuid";
import menu from "../menu/menu.js";

import { createOrderValidator } from "../middleware/orderValidator.js";
import { handleValidationErrors } from "../middleware/errorHandler.js";

const router = Router();

router.post('/api/orders', createOrderValidator, handleValidationErrors, (req, res) => {
    const { user_id, items } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required"});
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "items must be a non-empty array" });
    }

    let total_price = 0;
    for ( let itemId of items) {
        const product = menu.find(m => m.id === itemId);

        if (!product) {
            return res.status(400).json({ error: `Product with id ${itemId} not found` });
        }

        total_price += product.price;
    }

    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const status = 'pending';

    const stmt = dbOrders.prepare(`
        INSERT INTO orders (id, user_id, total_price, status, createdAt)
        VALUES (?, ?, ?, ?, ?)
        `);
        stmt.run(id, user_id, total_price, status, createdAt);

        const newOrder = dbOrders.prepare('SELECT * FROM orders WHERE id = ?').get(id);
        res.status(201).json(newOrder);
});

export default router;