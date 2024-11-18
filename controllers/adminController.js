const Oficina = require('../models/Oficina');
const Usuario = require('../models/Usuario');
const Reclamo = require('../models/Reclamo');

const crearOficina = async (req, res) => {
    const { nombre } = req.body;
    try {
        const nuevaOficina = await Oficina.create({ nombre });
        res.status(201).json(nuevaOficina);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la oficina', error });
    }
};

const gestionarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
    }
};

const obtenerEstadisticasReclamos = async (req, res) => {
    try {
        const estadisticas = await Reclamo.sequelize.query('CALL obtener_estadisticas_reclamos()');
        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las estadísticas', error });
    }
};

const generarInformeReclamos = async (req, res) => {
    try {
        const reclamos = await Reclamo.findAll();
        res.status(200).json(reclamos); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al generar el informe', error });
    }
};

module.exports = { crearOficina, gestionarUsuarios, obtenerEstadisticasReclamos, generarInformeReclamos };
