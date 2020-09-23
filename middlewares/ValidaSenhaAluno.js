const AlunoService = require("../services/AlunoService");

async function validaUser (req, res, next) {
    let {email, cpf} = req.body;

    try {
        let result = await AlunoService.alunoSenhaExists(email,cpf);

        if (result == undefined) {
            let result = {
                "name": "SenhaPersonal",
                "errors":[{
                    "message": "Bad Request"
                }]
            };

            return res.status(400).json(result);
        }

        req.body.aluno_id = result.codigo;
        next();

    } catch(erro) {
        res.status(500).json({erro: "ServerErro"})
    }

}    

module.exports = validaUser;