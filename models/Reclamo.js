// models/Reclamos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario'); // Importamos el modelo de Usuarios

const Reclamo = sequelize.define('Reclamo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'resuelto', 'en progreso'),
    allowNull: false,
  },
  fechaReclamo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'reclamos', // Nombre de la tabla
  timestamps: true, // Si quieres que se gestionen createdAt y updatedAt automáticamente
});

// Relación de clave foránea con Usuario
Reclamo.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = Reclamo;
