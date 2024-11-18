const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agrega los datos del usuario al objeto `req`
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;