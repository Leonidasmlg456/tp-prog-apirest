const express = require('express');
const router = express.Router();
const { crearReclamo, obtenerReclamos } = require('../controllers/reclamoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', crearReclamo);
router.get('/', obtenerReclamos);

module.exports = router;
