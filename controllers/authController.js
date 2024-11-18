const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const register = async (req, res) => {
    try {
        const { nombre, apellido, email, contraseña, tipo } = req.body;

        // Cifrar contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
            contraseña: hashedPassword,
            tipo,
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

module.exports = {
    register,
    login,
};
