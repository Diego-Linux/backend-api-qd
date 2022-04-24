const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const transporter = require('../utils/nodemailer');
const { resetPasswordTemplate } = require('../utils/emailTemplate');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, JWT_RESET } = process.env;

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ error: 'Este e-mail já está em uso.' });

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: passwordHashed });

        await newUser.save();

        const { _id } = newUser;

        res.status(200).json({ _id, name, email });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'E-mail ou senha incorretos.' });

        const checkPassw = await bcrypt.compare(password, user.password);

        if (!checkPassw) return res.status(400).json({ error: ' E-mail ou senha incorretos.' });

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/auth/refresh_token',
            maxAge: 30 * 24 * 60 * 1000
        });

        const { _id, name } = user;

        res.status(200).json({ access_token, _id, name });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.userLogout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/api/auth/refresh_token' })
        return res.json({ message: "Logout efetuado!" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
};

exports.generateAccessToken = async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;

        if (!rf_token) return res.status(400).json({error:'Por favor, faça login.'});

        jwt.verify(rf_token, REFRESH_TOKEN_SECRET, async (err, result) => {
            if (err) return res.status(400).json({ error: 'Por favor, faça login.' });

            const user = await User.findById(result.id).select('-password');

            if (!user) return res.status(400).json({ error: 'Nenhum usuário encontrado.' });

            const access_token = createAccessToken({ id: result.id })

            res.json({ access_token, user });
        })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// INÍCIO DOS RECURSOS DE ESQUECI MINHA SENHA:
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const userExists = await User.findOne({ email });

        if (!userExists) return res.status(400).json({ error: 'Nenhum e-mail encontrado.' });

        const token = jwt.sign({ id: userExists._id }, JWT_RESET, {
            expiresIn: '20m'
        });

        const { name } = userExists;

        const data = await resetPasswordTemplate(email, name, token);

        await User.findOneAndUpdate({ email }, { resetToken: token });

        transporter.sendMail(data)
            .then((successInfo) => {
                return res.status(200).json({ successInfo })
            }).catch((err) => {
                return res.status(400).json({ err })
            })
    } catch (err) {
        return res.status(400).json({ error: 'Desculpe, algo deu errado.' });
    }
};

exports.resetPassword = async (req, res) => {
    const { resetToken, password } = req.body;

    if (resetToken) {
        jwt.verify(resetToken, JWT_RESET,
            async function (error, decodedToken) {
                if (error) {
                    return res.status(401).json({
                        error: 'Token inválido.'
                    })
                }
                const user = await User.findOne({ resetToken });
                if (user) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await User.findOneAndUpdate(
                        { resetToken },
                        { password: hashedPassword, resetToken: "" },
                    );
                    return res.status(200).json({ message: 'Senha alterada com sucesso!' });
                } else {
                    return res.status(400).json({ error: 'Usuário não encontrado.' })
                }
            })
    }
};
// FIM DOS RECURSOS DE ESQUECI MINHA SENHA.


// REFRESH TOKEN
const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });;
};
