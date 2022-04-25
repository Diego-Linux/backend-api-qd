const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.editProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const checkEmail = await User.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({ error: 'Este e-mail já está em uso.' })
        }

        if (name.length > 30) {
            return res.status(400).json({ error: 'Seu nome é muito longo.' })
        }

        await User.findOneAndUpdate({ _id: req.user._id }, {
            name, email
        });
        res.status(200).json({ message: 'Perfil atualizado.' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Alterar senha
// PS: essa é uma alteração de senha para o usuário que está logado..os
// recursos de "esqueci minha senha" estão nas funções do *authController*.
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);

        const checkPassw = await bcrypt.compare(currentPassword, user.password);

        if (!checkPassw) return res.status(400).json({ error: 'Senha atual incorreta.' });

        if (newPassword.length < 6) return res.status(400).json({ error: 'A senha deve conter no mínimo 6 caracteres.' });

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({
            _id: req.user._id,
        }, { password: newPasswordHash });

        return res.status(200).json({ message: 'Senha alterada com sucesso.' })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

