const PlansService = require("../services/PersonalService");
const bcrypt = require('bcryptjs');
const validator = require("validator");
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
            res.statusCode = 201;
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
            res.statusCode = 415;
            return res.json({erro:"Parametro indefinido"})
        }

        try {
            let result = await PlansService.detalhes(id);
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async update(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 415;
            return res.json({erro:"Parametro indefinido"});
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
            await PlansService.atualiza(id,dados);
            res.statusCode = 202;
            res.json({
                "id":id,
                "message":"Personal atualizado"
            });
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 415;
            return res.json({erro:"Parametro indefinido"});
        }

        try {
            await PlansService.deleta(id);
            res.statusCode = 200;
            res.json({
                "id":id,
                "message":"Personal Deletado"
            });
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }
}

module.exports = new PersonalController();