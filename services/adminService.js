const { Admin } = require('../models');

// Crear un nuevo admin
const createAdmin = async (data) => {
    try {
        const nuevoAdmin = await Admin.create(data);
        return nuevoAdmin;
    } catch (error) {
        throw new Error('Error al crear el administrador: ' + error.message);
    }
};

module.exports = {
    createAdmin,
};
