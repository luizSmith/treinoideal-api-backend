//const HorarioService = require("../services/HorarioService");
const ResponseValidation = require("../Validation/ResponseValidation");
const PersonalAlunoService = require("../services/PersonalAlunoService");
const PersonalService = require("../services/PersonalService");

class PersonalAlunoController {

    async index(req, res) {
         let {personal,aluno} = req.headers;

        let dados = {
            cd_personal:personal
        };

        let result = await PersonalService.detalhes(personal);
        
        result.alunos = await PersonalAlunoService.lista(dados);

        res.status(200).send(result);       
    }
}


module.exports = new PersonalAlunoController();