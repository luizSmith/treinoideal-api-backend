const UfService = require("../services/UfService");
const validator = require("validator");
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
            return res.json({erro:"Parametro indefinido"})
        }

        try {
            let result = await UfService.detalhes(id);
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

}

module.exports = new UfController();