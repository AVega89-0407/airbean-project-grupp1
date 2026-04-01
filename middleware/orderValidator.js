import menu from "../menu/menu.js";

export function OrderValidator(req, res, next) {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ fel: "items must be a non-empty array" });
    }

    let calculatedTotal = 0;

    for (let itemId of items) {
        const product = menu.find(m => m.id === itemId);

        if (!product) {
            return res.status(400).json({ fel: `Produkten med id ${itemId} hittas inte`});
        }

    calculatedTotal += product.price;

    }

    req.calculatedTotal = calculatedTotal;
    req.validatedItems = items;

    next();

    }