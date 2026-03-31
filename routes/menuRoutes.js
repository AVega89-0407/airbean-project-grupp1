import express from 'express';
import menu from '../menu/menu.js';

const router = express.Router();

router.get("/", (_req, res) => {
    res.json(menu);
});

router.get('/:id', (req, res) => {
    const coffeeId = Number(req.params.id);
    const coffee = menu.find(m => m.id === coffeeId);
    
    if (!coffee) {
        return res.status(404).json({ error: 'Coffee not found' });
    }
    res.json(coffee);
});

export default router;