require('dotenv').config();
const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize usando los parámetros de la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña del usuario
  {
    host: process.env.DB_HOST,  // Host de base de datos
    dialect: process.env.DB_DIALECT, 
    port: process.env.PORT || 3306,  
    logging: false,  
    connectTimeout: 10000  // Timeout de conexión en milisegundos
  }
);

module.exports = sequelize;
