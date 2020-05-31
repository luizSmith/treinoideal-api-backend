const AulaService = require("../services/AulaService");
const ResponseValidation = require("../Validation/ResponseValidation");

class AulaController {
    async index(req, res) {
        try {
            let result = await AulaService.lista();
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async detals(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 404;
            return res.send("Not Found");
        }
        try {
            let result = await AulaService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async create(req, res) {
        let {data,horario} = req.body;

        let aula = {
            data,
            horario
        };

        try {
            let result = await AulaService.insert(aula);
            res.statusCode = 201;
            res.json(result);
        } catch(err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async update(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        let {data,horario,feito} = req.body;

        let aula = {
            data,
            horario,
            feito
        };

        try {
            let result = await AulaService.atualiza(id,aula);
            await ResponseValidation.update(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 404;
            return res.send("Not Found");
        }

        try {
            let result = await AulaService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }
}

module.exports = new AulaController();