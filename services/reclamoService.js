const Reclamo = require('../models/Reclamo');
const Usuario = require('../models/Usuario');
const Oficina = require('../models/Oficina');

// Obtener todos los reclamos
const getAllReclamos = async () => {
    try {
        const reclamos = await Reclamo.findAll({
            include: [
                { model: Usuario, as: 'cliente', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Usuario, as: 'empleado', attributes: ['id', 'nombre', 'apellido'] },
                { model: Oficina, attributes: ['id', 'nombre', 'tipo_reclamo'] },
            ],
        });
        return reclamos;
    } catch (error) {
        throw new Error('Error al obtener los reclamos: ' + error.message);
    }
};

// Crear un nuevo reclamo
const createReclamo = async (data) => {
    try {
        const { asunto, descripcion, clienteId, oficinaId } = data;

        // Validar que el cliente y la oficina existan
        const cliente = await Usuario.findByPk(clienteId);
        const oficina = await Oficina.findByPk(oficinaId);

        if (!cliente) throw new Error('Cliente no encontrado');
        if (!oficina) throw new Error('Oficina no encontrada');

        const nuevoReclamo = await Reclamo.create({
            asunto,
            descripcion,
            clienteId,
            oficinaId,
            estado: 'creado', // Estado inicial
        });

        return nuevoReclamo;
    } catch (error) {
        throw new Error('Error al crear el reclamo: ' + error.message);
    }
};

// Obtener un reclamo por ID
const getReclamoById = async (id) => {
    try {
        const reclamo = await Reclamo.findByPk(id, {
            include: [
                { model: Usuario, as: 'cliente', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Usuario, as: 'empleado', attributes: ['id', 'nombre', 'apellido'] },
                { model: Oficina, attributes: ['id', 'nombre', 'tipo_reclamo'] },
            ],
        });

        if (!reclamo) {
            throw new Error('Reclamo no encontrado');
        }
        return reclamo;
    } catch (error) {
        throw new Error('Error al obtener el reclamo: ' + error.message);
    }
};

// Actualizar un reclamo
const updateReclamo = async (id, data) => {
    try {
        const reclamo = await Reclamo.findByPk(id);

        if (!reclamo) {
            throw new Error('Reclamo no encontrado');
        }

        // Validar que solo se pueda actualizar si el estado es "creado"
        if (reclamo.estado !== 'creado') {
            throw new Error('No se puede actualizar un reclamo en este estado');
        }

        return await reclamo.update(data);
    } catch (error) {
        throw new Error('Error al actualizar el reclamo: ' + error.message);
    }
};

// Eliminar un reclamo
const deleteReclamo = async (id) => {
    try {
        const reclamo = await Reclamo.findByPk(id);

        if (!reclamo) {
            throw new Error('Reclamo no encontrado');
        }

        // Validar que solo se pueda eliminar si el estado es "creado"
        if (reclamo.estado !== 'creado') {
            throw new Error('Solo se pueden eliminar reclamos con estado "creado"');
        }

        await reclamo.destroy();
        return { message: 'Reclamo eliminado correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar el reclamo: ' + error.message);
    }
};

module.exports = {
    getAllReclamos,
    createReclamo,
    getReclamoById,
    updateReclamo,
    deleteReclamo,
};
