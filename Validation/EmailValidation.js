const nodemailer = require('nodemailer');

class EmailValidation {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.live.com",
            post: 25,
            secure: false,
            auth: {
                user:"treinoideal3000@outlook.com",
                pass:"klebinho123"
            }
        });
    }

    async enviarEmail(corpo, recebe) {
        await this.transporter.sendMail({
            from: "Treino Ideal <treinoideal3000@outlook.com>",
            to:recebe,
            subject: "Troca de senha no Treino Ideal",
            html: corpo
        }).then(mensage => {
            console.log(mensage);
            return true;
        }).catch(err => {
            console.log(err);
            throw err;
        })
    }
}

module.exports = new EmailValidation();