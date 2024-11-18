const express = require('express');
const { getAllOficinas, createOficina, getOficinaById, updateOficina, deleteOficina } = require('../services/oficinaService');
const router = express.Router();

// Obtener todas las oficinas
router.get('/', async (req, res) => {
    try {
        const oficinas = await getAllOficinas();
        res.json(oficinas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una oficina
router.post('/', async (req, res) => {
    try {
        const nuevaOficina = await createOficina(req.body);
        res.status(201).json(nuevaOficina);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una oficina por ID
router.get('/:id', async (req, res) => {
    try {
        const oficina = await getOficinaById(req.params.id);
        res.json(oficina);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Actualizar una oficina
router.put('/:id', async (req, res) => {
    try {
        const oficinaActualizada = await updateOficina(req.params.id, req.body);
        res.json(oficinaActualizada);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Eliminar una oficina
router.delete('/:id', async (req, res) => {
    try {
        const resultado = await deleteOficina(req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.use(authMiddleware);

module.exports = router;
