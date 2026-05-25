import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Guardar un ticket nuevo
app.post('/api/tickets', async (req, res) => {
  const { name, email, github, avatar_url } = req.body;

  try {
    // Primero crea el usuario
    const usuario = await pool.query(
      `INSERT INTO users (name, email, github, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, email, github, avatar_url]
    );

    const user_id = usuario.rows[0].id;

    // Luego crea el ticket
    const numero_ticket = Math.floor(Math.random() * 90000) + 10000;
    const ticket = await pool.query(
      `INSERT INTO tickets (numero_ticket, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [numero_ticket, user_id]
    );

    res.json({ ticket: ticket.rows[0], user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el ticket' });
  }
});

// Obtener todos los tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, u.name, u.email, u.github, u.avatar_url
      FROM tickets t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});