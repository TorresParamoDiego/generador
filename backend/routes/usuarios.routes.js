import express from 'express';
import Usuario from '../models/Usuario.js';
import Ticket from '../models/Ticket.js';

const router = express.Router();


// =========================
// GET - Obtener usuarios
// =========================
router.get('/', async (req, res) => {

  try {

    const usuarios = await Usuario.findAll();

    res.json(usuarios);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// =========================
// POST - Crear usuario
// =========================
router.post('/', async (req, res) => {

  try {

    const usuario = await Usuario.create(req.body);

    res.json(usuario);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// =========================
// DELETE - Eliminar usuario
// =========================
router.delete('/:id', async (req, res) => {

  try {

    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    await usuario.destroy();

    res.json({
      mensaje: 'Usuario eliminado'
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

export default router;