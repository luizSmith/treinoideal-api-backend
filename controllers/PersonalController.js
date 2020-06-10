const PlansService = require("../services/PersonalService");
const validator = require("validator");
const ResponseValidation = require("../Validation/ResponseValidation");
const DateValidation = require("../Validation/DateValidation");

class PersonalController {
    async create(req, res) {
        let {nome, email, senha, data, cref} = req.body;

        let personal = {
            nome,
            email,
            senha,
            data,
            cref
        };

        try {
            personal.data = await DateValidation.format(data,"YYYY-MM-dd");

            let result = await PlansService.insert(personal);

            await ResponseValidation.insert(result,res);

            res.json({
                codigo:result.cd_personal,
                nome:result.nm_personal,
                email:result.nm_email
            });
        } catch(err) {
            res.status(400).json(err);
        }
        
    }

    async index(req, res) {
        try {
            let result = await PlansService.lista();
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async detals(req, res) {
        let id = req.params.id;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await PlansService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async update(req, res) {
        let id = req.params.id;

        let {nome, email, senha, data} = req.body;

        let personal = {
            nome,
            email,
            senha
        };
        
        try {
            await ResponseValidation.validaNumber(id,res);

            if (data != undefined) {
                personal.data = await DateValidation.format(data,"YYYY-MM-dd");
            }
            
            let result = await PlansService.atualiza(id,personal);

            ResponseValidation.update(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        try {

            await ResponseValidation.validaNumber(id,res);

            let result = await PlansService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

module.exports = new PersonalController();