exports.validRegister = async (req, res, next) => {
    const { name, email, password } = req.body

    const errors = [];

    if (!name) {
        errors.push("O campo nome é obrigatório.");
    } else if (name.length > 30) {
        errors.push("Seu nome é muito longo.");
    }

    if (!email) {
        errors.push("O campo e-mail é obrigatório.");
    }

    if (password.length < 6) {
        errors.push("A senha deve conter no mínimo 6 caracteres.");
    }

    if (errors.length > 0) return res.status(400).json({ error: errors })
    next();
};

exports.validPost = async (req, res, next) => {
    const { title, description } = req.body

    const errors = [];

    if (!title) {
        errors.push("Título é obrigatório.");
    } else if (title.length > 100) {
        errors.push("Seu título é muito longo.");
    }

    if (!description) {
        errors.push("Descrição é obrigatório.");
    }

    if (errors.length > 0) return res.status(400).json({ error: errors })
    next();
};

