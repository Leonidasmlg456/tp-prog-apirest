const express = require('express');
const router = express.Router();
const { listarReclamosEmpleado, cambiarEstadoReclamo } = require('../controllers/empleadoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/reclamos', listarReclamosEmpleado); 
router.put('/reclamos/:id/estado', cambiarEstadoReclamo);

module.exports = router;
