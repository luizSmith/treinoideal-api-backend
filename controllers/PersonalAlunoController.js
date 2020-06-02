//const HorarioService = require("../services/HorarioService");
const ResponseValidation = require("../Validation/ResponseValidation");

class PersonalAlunoController {

    async index(req, res) {
        res.send("oi");
    }


}


module.exports = new PersonalAlunoController();