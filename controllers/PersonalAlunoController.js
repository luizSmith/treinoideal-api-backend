//const HorarioService = require("../services/HorarioService");
const ResponseValidation = require("../Validation/ResponseValidation");
const PersonalAlunoService = require("../services/PersonalAlunoService");
const PersonalService = require("../services/PersonalService");

class PersonalAlunoController {

    async index(req, res) {
        try {
            let {codigo} = req.headers['dados_user'];

            let result = await PersonalAlunoService.lista(codigo);

            ResponseValidation.detalhes(result, res);
        } catch(erro) {
            res.status(400).send(erro);
        }             
    }
}


module.exports = new PersonalAlunoController();