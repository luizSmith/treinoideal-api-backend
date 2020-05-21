const PlansService = require("../services/PersonalService");
const bcrypt = require('bcryptjs');
const validator = require("validator");
const ResponseValidation = require("../Validation/ResponseValidation");
class PersonalController {
    async create(req, res) {
        let {nome, email, senha, data, cref} = req.body;

        let salt = bcrypt.genSaltSync(10);
        senha = bcrypt.hashSync(senha,salt);

        let per = {
            nome,
            email,
            senha,
            data,
            cref
        };

        try {
            let result = await PlansService.insert(per);

            await ResponseValidation.insert(result,res);

            res.json({
                codigo:result.cd_personal,
                nome:result.nm_personal,
                email:result.nm_email
            });
        } catch(err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
        
    }

    // sem retorno não é erro
    async index(req, res) {
        try {
            let result = await PlansService.lista();
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
            let result = await PlansService.detalhes(id);
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

        let {nome, email, senha, data} = req.body;

        let salt = bcrypt.genSaltSync(10);
        senha = bcrypt.hashSync(senha,salt);

        let dados = {
            nm_nome:nome,
            nm_email:email,
            nm_senha:senha,
            dt_nascimento:data
        };

        try {
            let result = await PlansService.atualiza(id,dados);
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
            await PlansService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }
}

module.exports = new PersonalController();