const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = process.env;

const isAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) return res.status(400).json({ error: 'Autenticação inválida, por favor faça login.' });

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

        if (!decoded) return res.status(400).json({ error: 'Autenticação inválida, por favor faça login.' })

        const user = await User.findOne({ _id: decoded.id });

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = isAuth;