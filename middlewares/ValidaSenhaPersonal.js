const PersonalService = require("../services/PersonalService");

async function validaSenhaPersonal (req, res, next) {
    let {email, cref} = req.body;

    try {
        let result = await PersonalService.personalSenhaExists(email,cref);

        if (result == undefined) {
            let result = {
                "name": "SenhaPersonal",
                "errors":[{
                    "message": "Bad Request"
                }]
            };
            return res.status(400).json(result);
        }
        
        req.body.personal_id = result.codigo;
        next();

    } catch(erro) {
        res.status(500).json({erro: "ServerErro"})
    }
}    

module.exports = validaSenhaPersonal;