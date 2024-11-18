const express = require('express');
const router = express.Router();
const { 
    crearOficina,
    gestionarUsuarios,
    obtenerEstadisticasReclamos,
    generarInformeReclamos 
} = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.use(authMiddleware); 
router.use(adminMiddleware); 

router.post('/oficinas', crearOficina);
router.get('/usuarios', gestionarUsuarios);
router.get('/estadisticas', obtenerEstadisticasReclamos); 
router.get('/informe', generarInformeReclamos);

module.exports = router;
