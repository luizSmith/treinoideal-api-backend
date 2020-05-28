const CepService = require("../services/CepService");
const ResponseValidation = require("../Validation/ResponseValidation");
const validator = require("validator");
class CepController {
    async create(req, res) {
        let {cep, longra, bairro, cidade, uf} = req.body;

        let per = {
            cod:cep,
            longra,
            bairro,
            cidade,
            uf
        };

        try {
            let result = await CepService.insert(per);
            res.statusCode = 201;
            res.json(result);
        } catch(err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
        
    }

    async index(req, res) {
        try {
            let result = await CepService.lista();
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
            let result = await CepService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
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

        let {longra, bairro, cidade, uf} = req.body;

        let dados = {
            nm_longradouro:longra,
            nm_bairro:bairro,
            nm_cidade:cidade,
            sg_uf:uf
        };

        try {
            let result = await CepService.atualiza(id,dados);
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
            let result = await CepService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }
}

module.exports = new CepController();