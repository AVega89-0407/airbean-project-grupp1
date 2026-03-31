import crypto from 'crypto';

export function createOrder(req, res) {
    const {items, total, userId} = req.body;

const orderId = crypto.randomUUID();
const eta = Math.floor(Math.random() *10) + 5 + items.length * 2;

res.status(201).json({
    orderId,
    eta,
    items,
    total,
    userId: userId || null,
    message: `Order mottagen! Din beställning kommer att vara klar om ca ${eta} minuter.`
});
}