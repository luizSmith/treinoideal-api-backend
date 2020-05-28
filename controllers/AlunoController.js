const AlunoService = require("../services/AlunoService");
const ResponseValidation = require("../Validation/ResponseValidation");

class AlunoController {

    async index(req, res) {
        try {
            let result = await AlunoService.lista();
            res.statusCode = 200;
            res.json(result);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async create(req, res) {
        let {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep,
            longra,
            bairro,
            cidade,
            uf
        } = req.body;

        let aluno = {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep,
            longra,
            bairro,
            cidade,
            uf
        }

        try {
            let result = await AlunoService.insert(aluno);
            res.statusCode = 201;
            res.json(result);
        } catch(err) {
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
            let result = await AlunoService.detalhes(id);
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

        let {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep,
            longra,
            bairro,
            cidade,
            uf
        } = req.body;

        let dados = {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep,
            longra,
            bairro,
            cidade,
            uf
        }

        try {
            let result = await AlunoService.atualiza(id,dados);
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
            let result = await AlunoService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.statusCode = 400;
            res.json({erro:err})
        }
    }

    async verificaCPF(cpf) {

    }
}

module.exports = new AlunoController();