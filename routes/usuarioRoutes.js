const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); 

// Ruta para obtener los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    // Obtener los usuarios
    const usuarios = await Usuario.findAll();

    res.json({
      success: true,
      data: usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios',
    });
  }
});

// Ruta para obtener usuarios por tipo (cliente, empleado, administrador)
router.get('/usuarios/:tipo', async (req, res) => {
  const tipo = req.params.tipo;
  try {
    if (!['cliente', 'empleado', 'administrador'].includes(tipo)) {
      return res.status(400).json({
        success: false,
        message: 'Tipo inválido'
      });
    }

    const usuarios = await Usuario.findAll({
      where: {
        tipo: tipo, // Filtra por tipo de usuario
      },
    });

    // Devolver usuarios por tipo
    res.json({
      success: true,
      data: usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios por tipo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios',
    });
  }
});

module.exports = router;
