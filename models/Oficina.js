// models/Oficinas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que tu archivo db.js esté correctamente configurado

const Oficina = sequelize.define('Oficina', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'oficinas', // Nombre de la tabla
  timestamps: true, // Si quieres que se gestionen createdAt y updatedAt automáticamente
});

module.exports = Oficina;
