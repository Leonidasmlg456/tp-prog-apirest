const Usuario = require('../models/Usuario');

// Crear un nuevo usuario
const createUsuario = async (data) => {
    try {
        return await Usuario.create(data);
    } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
    }
};

// Obtener un usuario por email
const getUsuarioByEmail = async (email) => {
    try {
        return await Usuario.findOne({ where: { email } });
    } catch (error) {
        throw new Error('Error al buscar el usuario: ' + error.message);
    }
};

// Obtener un usuario por ID
const getUsuarioById = async (id) => {
    try {
        return await Usuario.findByPk(id);
    } catch (error) {
        throw new Error('Error al buscar el usuario: ' + error.message);
    }
};

module.exports = {
    createUsuario,
    getUsuarioByEmail,
    getUsuarioById,
};
