import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from '../data/db.js';

const router = Router();

router.get("/", (_req, res) => {
  try {
    const users = db.prepare("SELECT userId, name, email, createdAt FROM users").all();
    res.json(users);
  } catch (err) {
    console.error("GET /users:", err);
    res.status(500).json({ fel: "Kunde inte hämta användare" });
  }
});

router.get('/:userId', (req, res) => {
  const id = req.params.userId;

  const user = db.prepare('SELECT userId, name, email, createdAt FROM users WHERE userId = ?').get(id);

  if (!user) {
    return res.status(404).json({ fel: 'Användaren hittades inte' });
  }

  res.json(user);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ fel: 'Name och email krävs' });
  }

  const createdAt = new Date().toISOString();
  const userId = uuidv4();

  const stmt = db.prepare(`
    INSERT INTO users (userId, name, email, createdAt)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(userId, name, email, createdAt);

  const newUser = db.prepare('SELECT userId, name, email, createdAt FROM users WHERE userId = ?').get(userId);
  res.status(201).json(newUser);
});

router.put('/:userId', (req, res) => {
  const id = req.params.userId;

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ fel: 'Name och email krävs' });
  }

  const stmt = db.prepare(`
    UPDATE users
    SET name = ?, email = ?
    WHERE userId = ?
  `);
  const result = stmt.run(req.body.name, req.body.email, id);

  if (result.changes === 0) {
    return res.status(404).json({ fel: 'Användaren hittades inte' });
  }

  const updatedUser = db.prepare('SELECT userId, name, email, createdAt FROM users WHERE userId = ?').get(id);
  res.json(updatedUser);
});


router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  try {
    const user = db.prepare('SELECT userId FROM users WHERE userId = ?').get(userId);

    if (!user) {
      return res.status(404).json({ fel: 'Användaren hittades inte' });
    }

  // Sätt userId till null i orders där userId matchar
 db.prepare('UPDATE orders SET userId = null WHERE userId = ?').run(userId);

// radera användaren
const result =db.prepare('DELETE FROM users WHERE userId = ?').run(userId);

if (result.changes === 0) {
  return res.status(500).json({ fel: "Kunde inte radera användaren" });
}

res.status(204).send({
    message: "Användaren och relaterade orderdata har raderats"
});

res.status(200).json({
    message: "Användaren och relaterade orderhistoriken anonymiserades"
});

}
catch (err) {
    console.error("DELETE /users/:userId:", err);
    res.status(500).json({ fel: "internt serverfel" });
}
});

export default router;