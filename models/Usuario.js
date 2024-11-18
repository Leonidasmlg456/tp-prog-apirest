// models/Usuarios.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Oficina = require('./Oficina'); // Importamos el modelo de Oficinas

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('cliente', 'empleado', 'administrador'),
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'usuarios', // Nombre de la tabla
  timestamps: true, // Si quieres que se gestionen createdAt y updatedAt automáticamente
});

// Relación de clave foránea con Oficina
Usuario.belongsTo(Oficina, { foreignKey: 'oficinaId', as: 'oficina' });

module.exports = Usuario;
