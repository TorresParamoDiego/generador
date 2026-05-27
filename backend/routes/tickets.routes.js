import express from 'express';
import Ticket from '../models/Ticket.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();


// =========================
// GET - Obtener tickets
// =========================
router.get('/', async (req, res) => {

  try {

    const tickets = await Ticket.findAll();

    res.json(tickets);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// =========================
// POST - Crear ticket
// =========================
router.post('/', async (req, res) => {

  const { user_id } = req.body;

  try {

    // Verificar usuario
    const usuario = await Usuario.findByPk(user_id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Generar ticket
    const num_ticket =
      Math.floor(Math.random() * 90000) + 10000;

    // Crear ticket
    const ticket = await Ticket.create({
      num_ticket,
      user_id
    });

    res.json(ticket);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// =========================
// DELETE - Eliminar ticket
// =========================
router.delete('/:id', async (req, res) => {

  try {

    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        error: 'Ticket no encontrado'
      });
    }

    await ticket.destroy();

    res.json({
      mensaje: 'Ticket eliminado'
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;