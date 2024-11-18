const adminMiddleware = (req, res, next) => {
    if (req.user.tipo !== 'administrador') {
        return res.status(403).json({ mensaje: 'No tiene permisos para acceder a esta ruta' });
    }
    next();
};

module.exports = adminMiddleware;
