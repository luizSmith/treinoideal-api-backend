//const AlunoService = require("../services/AlunoService");
const ResponseValidation = require("../Validation/ResponseValidation");

class AlunoController {

    index(req, res) {
        res.send('oi');
    }

}

module.exports = new AlunoController();