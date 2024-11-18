const Reclamo = require('../models/Reclamo');
const Usuario = require('../models/Usuario');

const listarReclamosEmpleado = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.user.id, { include: 'Oficina' });
        const oficinaId = usuario.oficinaId;

        const reclamos = await Reclamo.findAll({ where: { oficinaId } });

        res.status(200).json(reclamos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar los reclamos', error });
    }
};

const cambiarEstadoReclamo = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!['creado', 'en_proceso', 'finalizado', 'cancelado'].includes(estado)) {
        return res.status(400).json({ mensaje: 'Estado inválido' });
    }

    try {
        const reclamo = await Reclamo.findByPk(id);
        if (!reclamo) return res.status(404).json({ mensaje: 'Reclamo no encontrado' });

        const usuario = await Usuario.findByPk(req.user.id);
        if (reclamo.oficinaId !== usuario.oficinaId) {
            return res.status(403).json({ mensaje: 'No tiene permisos para cambiar el estado de este reclamo' });
        }

        reclamo.estado = estado;
        await reclamo.save();

        res.status(200).json({ mensaje: 'Estado actualizado con éxito', reclamo });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cambiar el estado del reclamo', error });
    }
};

module.exports = { listarReclamosEmpleado, cambiarEstadoReclamo };
