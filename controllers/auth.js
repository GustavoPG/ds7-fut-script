// auth.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils');

// generar token
const generateToken = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '3m' });
}

// verificar
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };