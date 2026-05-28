import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Usuario from './usuario.js';

const Ticket = sequelize.define('Ticket', {
  num_ticket: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'tickets', timestamps: false });

Ticket.belongsTo(Usuario, { foreignKey: 'user_id' });
Usuario.hasMany(Ticket, { foreignKey: 'user_id' });

export default Ticket;