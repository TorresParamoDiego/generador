/*import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import Usuario from './models/Usuario.js';
import Ticket from './models/Ticket.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


//Endpoint
// Guardar ticket nuevo
app.post('/api/tickets', async (req, res) => {
  const { name, email, github, avatar_url, password } = req.body;
  try {
    const usuario = await Usuario.create({ name, email, github, avatar_url, password });
    const num_ticket = Math.floor(Math.random() * 90000) + 10000;
    const ticket = await Ticket.create({ num_ticket, user_id: usuario.id });
    res.json({ ticket, usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({ include: Usuario });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a PostgreSQL con Sequelize');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error de conexión:', err));*/

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './db.js';
import Usuario from './models/Usuario.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import ticketsRoutes from './routes/tickets.routes.js';
import Ticket from './models/ticket.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tickets', ticketsRoutes);

// Login de usuario
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    res.json({ message: 'Login exitoso', usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro de usuario
app.post('/api/register', async (req, res) => {
  const { name, email, github, password } = req.body;
  try {
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(409).json({ error: 'Ya existe una cuenta con ese correo' });
    }
    const usuario = await Usuario.create({ name, email, github, password });
    const num_ticket = Math.floor(Math.random() * 90000) + 10000;
    const ticket = await Ticket.create({ num_ticket, user_id: usuario.id });
    res.status(201).json({ message: 'Usuario registrado', usuario, ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;


sequelize.authenticate()
  .then(() => {

    console.log('Conectado a PostgreSQL con Sequelize');

    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });

  })
  .catch(err => console.error(err));