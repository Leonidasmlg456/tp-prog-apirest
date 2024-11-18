const Reclamo = require('../models/Reclamo');

const crearReclamo = async (req, res) => {
    const { descripcion, oficinaId } = req.body;
    try {
        const nuevoReclamo = await Reclamo.create({
            descripcion,
            oficinaId,
            clienteId: req.user.id  
        });
        res.status(201).json(nuevoReclamo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el reclamo', error });
    }
};

const obtenerReclamos = async (req, res) => {
    try {
        const reclamos = await Reclamo.findAll({ where: { clienteId: req.user.id } });
        res.status(200).json(reclamos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los reclamos', error });
    }
};

module.exports = { crearReclamo, obtenerReclamos };
