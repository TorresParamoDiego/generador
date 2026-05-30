import express from 'express';
import Usuario from '../models/usuario.js';
import Ticket from '../models/ticket.js';

const router = express.Router();

// =========================
// GET - Estadísticas del dashboard
// =========================
router.get('/stats', async (req, res) => {
  try {
    const totalUsuarios = await Usuario.count({ where: { role: 'user' } });
    const totalTickets = await Ticket.count();

    // Tickets de hoy
    const inicioHoy = new Date();
    inicioHoy.setHours(0, 0, 0, 0);
    const { Op } = await import('sequelize');
    const ticketsHoy = await Ticket.count({
      where: { date: { [Op.gte]: inicioHoy } }
    });

    // Último usuario registrado
    const ultimoUsuario = await Usuario.findOne({
      where: { role: 'user' },
      order: [['date', 'DESC']],
    });

    res.json({
      totalUsuarios,
      totalTickets,
      ticketsHoy,
      ultimoUsuario: ultimoUsuario
        ? { name: ultimoUsuario.name, email: ultimoUsuario.email }
        : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// GET - Todos los tickets con datos del usuario
// =========================
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{ model: Usuario, attributes: ['id', 'name', 'email', 'github'] }],
      order: [['date', 'DESC']],
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// GET - Todos los usuarios (solo regulares)
// =========================
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { role: 'user' },
      attributes: { exclude: ['password'] },
      order: [['date', 'DESC']],
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// POST - Crear usuario (desde admin)
// =========================
router.post('/usuarios', async (req, res) => {
  const { name, email, github, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios' });
    }
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });
    }
    const usuario = await Usuario.create({
      name,
      email,
      github: github || null,
      password,
      role: role === 'admin' ? 'admin' : 'user',
    });
    const { password: _pw, ...sinPassword } = usuario.toJSON();
    res.status(201).json(sinPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// PUT - Editar usuario
// =========================
router.put('/usuarios/:id', async (req, res) => {
  const { name, email, github, password, role } = req.body;
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // No permitir editar el correo a uno ya usado por otro
    if (email && email !== usuario.email) {
      const otro = await Usuario.findOne({ where: { email } });
      if (otro) {
        return res.status(409).json({ error: 'Ya existe otro usuario con ese correo' });
      }
      usuario.email = email;
    }
    if (name !== undefined) usuario.name = name;
    if (github !== undefined) usuario.github = github;
    if (password) usuario.password = password;
    if (role && (role === 'user' || role === 'admin')) usuario.role = role;
    await usuario.save();
    const { password: _pw, ...sinPassword } = usuario.toJSON();
    res.json(sinPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// POST - Crear ticket (asignado a un usuario)
// =========================
router.post('/tickets', async (req, res) => {
  const { user_id } = req.body;
  try {
    if (!user_id) {
      return res.status(400).json({ error: 'Falta el id del usuario' });
    }
    const usuario = await Usuario.findByPk(user_id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const num_ticket = Math.floor(Math.random() * 90000) + 10000;
    const ticket = await Ticket.create({ num_ticket, user_id });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// PUT - Reasignar ticket a otro usuario
// =========================
router.put('/tickets/:id', async (req, res) => {
  const { user_id } = req.body;
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    if (user_id) {
      const usuario = await Usuario.findByPk(user_id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario destino no encontrado' });
      }
      ticket.user_id = user_id;
    }
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// DELETE - Eliminar ticket
// =========================
router.delete('/tickets/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    await ticket.destroy();
    res.json({ mensaje: 'Ticket eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =========================
// DELETE - Eliminar usuario y sus tickets
// =========================
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (usuario.role === 'admin') {
      return res.status(403).json({ error: 'No se puede eliminar un administrador' });
    }
    // Eliminar tickets asociados primero
    await Ticket.destroy({ where: { user_id: usuario.id } });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario y sus tickets eliminados' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
