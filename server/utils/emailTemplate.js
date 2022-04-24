exports.newCommentTemplate = async (email, name, content) => {
    const infoEmail = {
        from: `${process.env.EMAIL_ADDRESS_FROM}`,
        to: email,
        subject: 'Novo comentário',
        html: `
        <div style="width:90%;margin:auto;
            padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: left; color: #7B9CD8;"></h2>
        
            <h2 style="font-weight:bold;">${name} fez um novo comentário em seu post:</h2>
            <div style="background-color:#05040b; border-radius:10px; padding:5px 10px 5px;">
            <p style="font-size:18px; color:#fff;">${content}</p>
            </div>
    </div>`
    };
    return infoEmail;
};

exports.resetPasswordTemplate = async (email, name, token) => {
    const infoEmail = {
        from: `${process.env.EMAIL_ADDRESS_FROM}`,
        to: email,
        subject: 'Resetar senha',
        html: `
    <div style="width:90%;margin:auto;
             padding: 50px 20px; font-size: 110%;
             border-radius:10px;">
             <div style="width:100%;">
             <img style="width:250px;" src="cid:logo">
             </div>
             <h2>Olá, ${name}.Abaixo está o token para alterar sua senha.</h2>
                    <br />
            <div>${token}</div>
    </div>
                  `
    };
    return infoEmail;
};

