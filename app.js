require('dotenv').config();

const express = require('express'); 
const bodyParser = require('body-parser'); 
const sequelize = require('./config/db'); // Conexion a la base de datos
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticacion
const reclamoRoutes = require('./routes/reclamoRoutes'); 
const empleadoRoutes = require('./routes/empleadoRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 
const clienteRoutes = require('./routes/clienteRoutes'); 
const usuarioRoutes = require('./routes/usuarioRoutes');
// const authMiddleware = require('./middlewares/authMiddleware'); // Middleware autenticacin
// const Usuario = require('./models/Usuario'); 
// const Reclamo = require('./models/Reclamo'); 
// const Oficina = require('./models/Oficina'); 

const app = express();

// Middleware para parsear el body
app.use(bodyParser.json()); 

// Rutas de la API
app.use('/api', usuarioRoutes);  // Ruta para los usuarios
app.use('/api/auth', authRoutes);  // Ruta para autenticación
app.use('/api/reclamos', reclamoRoutes);  // Ruta para los reclamos
app.use('/api/empleados', empleadoRoutes);  // Ruta para los empleados
app.use('/api/admin', adminRoutes);  // Ruta para administradores
app.use('/api/clientes', clienteRoutes);  // Ruta para clientes

// Autenticacion y sincronizacion a base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa con la base de datos');
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Modelos sincronizados con la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar o sincronizar con la base de datos:', error.message);
    });

// Puerto del servidor
app.listen(3000, () => {
  console.log(`Servidor corriendo en el puerto`);
});
