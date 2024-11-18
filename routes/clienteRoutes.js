const express = require('express');
const router = express.Router();
const { crearReclamo, obtenerReclamos } = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/reclamos', crearReclamo);   
router.get('/reclamos', obtenerReclamos);  

module.exports = router;
