const Reclamo = require('../models/Reclamo');

const crearReclamo = async (req, res) => {
    const { descripcion, tipoReclamo } = req.body;
    const clienteId = req.user.id; 

    try {
        const nuevoReclamo = await Reclamo.create({
            descripcion,
            tipoReclamo,
            clienteId,
            estado: 'creado',
        });

        res.status(201).json(nuevoReclamo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error a crear el reclamo', error });
    }
};

const obtenerReclamos = async (req, res) => {
    const clienteId = req.user.id;

    try {
        const reclamos = await Reclamo.findAll({ where: { clienteId } });
        res.status(200).json(reclamos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error a obtener los reclamos', error });
    }
};

module.exports = { crearReclamo, obtenerReclamos };
