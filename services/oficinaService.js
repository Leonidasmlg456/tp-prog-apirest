const Oficina = require('../models/Oficina');

const getAllOficinas = async () => {
    return await Oficina.findAll({ include: 'empleados' });
};

// Crear oficina
const createOficina = async (data) => {
    return await Oficina.create(data);
};

// Obtener una oficina por ID
const getOficinaById = async (id) => {
    const oficina = await Oficina.findByPk(id, { include: 'empleados' });
    if (!oficina) throw new Error('Oficina no encontrada');
    return oficina;
};

// Actualizar una oficina
const updateOficina = async (id, data) => {
    const oficina = await Oficina.findByPk(id);
    if (!oficina) throw new Error('Oficina no encontrada');
    return await oficina.update(data);
};

// Eliminar una oficina
const deleteOficina = async (id) => {
    const oficina = await Oficina.findByPk(id);
    if (!oficina) throw new Error('Oficina no encontrada');
    await oficina.destroy();
    return { message: 'Oficina eliminada correctamente' };
};

module.exports = {
    getAllOficinas,
    createOficina,
    getOficinaById,
    updateOficina,
    deleteOficina,
};
