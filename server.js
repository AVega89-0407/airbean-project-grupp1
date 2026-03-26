import express from 'express'
import menu from './menu/menu.js';

const app = express();
app.use(express.json());


app.get('/', (req,res) => {
    res.json({ message: 'Welcome to Airbean!'});
});

app.get('/menu', (req, res) => {
    res.json(menu);
});

app.get('/menu/:id', (req, res) => {
    const coffeeId = Number(req.params.id);

    const coffee = menu.find(m => m.id === coffeeId);

    if (!coffee) {
        return res.status(404).json({ error: 'Coffee not found' });
    }
    res.json(coffee);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API:et lyssnar på http://localhost:${PORT}`);
    
});