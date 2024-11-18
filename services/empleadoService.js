const { Empleado } = require('../models');

// Obtener todos los empleados
const getAllEmpleados = async () => {
    try {
        const empleados = await Empleado.findAll();
        return empleados;
    } catch (error) {
        throw new Error('Error al obtener los empleados: ' + error.message);
    }
};

// Crear un nuevo empleado
const createEmpleado = async (data) => {
    try {
        const nuevoEmpleado = await Empleado.create(data);
        return nuevoEmpleado;
    } catch (error) {
        throw new Error('Error al crear el empleado: ' + error.message);
    }
};

// Obtener un empleado por ID
const getEmpleadoById = async (id) => {
    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }
        return empleado;
    } catch (error) {
        throw new Error('Error al obtener el empleado: ' + error.message);
    }
};

// Actualizar un empleado
const updateEmpleado = async (id, data) => {
    try {
        const empleado = await Empleado.findByPk(id);
        if (!empleado) {
            throw new Error('Empleado no encontrado');
        }
        return await empleado.update(data);
    } catch (error) {
        throw new Error('Error al actualizar el empleado: ' + error.message);
    }
};

module.exports = {
    getAllEmpleados,
    createEmpleado,
    getEmpleadoById,
    updateEmpleado,
};
