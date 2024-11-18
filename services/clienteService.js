const { Cliente } = require('../models');

// Obtener todos los clientes
const getAllClientes = async () => {
    try {
        const clientes = await Cliente.findAll();
        return clientes;
    } catch (error) {
        throw new Error('Error al obtener los clientes: ' + error.message);
    }
};

// Crear un nuevo cliente
const createCliente = async (data) => {
    try {
        const nuevoCliente = await Cliente.create(data);
        return nuevoCliente;
    } catch (error) {
        throw new Error('Error al crear el cliente: ' + error.message);
    }
};

// Obtener un cliente por ID
const getClienteById = async (id) => {
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        return cliente;
    } catch (error) {
        throw new Error('Error al obtener el cliente: ' + error.message);
    }
};

module.exports = {
    getAllClientes,
    createCliente,
    getClienteById,
};
