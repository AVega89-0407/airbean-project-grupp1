import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from '../data/db.js';

const router = Router();

router.get("/", (_req, res) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  } catch (err) {
    console.error("GET /users:", err);
    res.status(500).json({ fel: "Kunde inte hämta användare" });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

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
  const id = uuidv4();

  const stmt = db.prepare(`
    INSERT INTO users (id, name, email, createdAt)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(id, name, email, createdAt);

  const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ fel: 'Name och email krävs' });
  }

  const stmt = db.prepare(`
    UPDATE users
    SET name = ?, email = ?
    WHERE id = ?
  `);
  const result = stmt.run(req.body.name, req.body.email, id);

  if (result.changes === 0) {
    return res.status(404).json({ fel: 'Användaren hittades inte' });
  }

  const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  res.json(updatedUser);
});


router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ fel: 'Användaren hittades inte' });
  }

  res.status(204).send();
});

export default router;