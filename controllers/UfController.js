const UfService = require("../services/UfService");
const validator = require("validator");
const ResponseValidation = require("../Validation/ResponseValidation");
class UfController {

    async index(req, res) {
        try {
            let result = await UfService.lista();
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async detals(req, res) {
        let id = req.params.id;

        if (validator.isEmpty(id)) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        try {
            let result = await UfService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

}

module.exports = new UfController();