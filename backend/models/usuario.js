import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Usuario = sequelize.define('Usuario', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  github: { type: DataTypes.STRING },
  avatar_url: { type: DataTypes.TEXT },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'users', timestamps: false });

export default Usuario;