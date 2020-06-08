const AlunoService = require("../services/AlunoService");
const CepService = require("../services/CepService");
const PersonalAlunoService = require("../services/PersonalAlunoService");
const ResponseValidation = require("../Validation/ResponseValidation");
const CPF = require('../Validation/CPFValidation');

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
            uf,
            personal
        } = req.body;

        let aluno = {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep
        }

        let endereco = {
            cod:cep,
            longra,
            bairro,
            cidade,
            uf
        }    

        try {
            endereco = await CepService.insert(endereco);

            await CPF.verificaCPF(cpf);

            aluno  = await AlunoService.insert(aluno);

            let result = {...aluno,...endereco};

            let associacao = {
                aluno:result.codigo,
                personal:personal,
            }

            await PersonalAlunoService.insert(associacao);

            res.statusCode = 201;
            res.json(result);
        } catch(err) {
            res.statusCode = 400;
            res.json(err.errors)
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
            nome,nascimento,cpf,email,senha,numero_endereco,
            cep,longra, bairro,cidade,uf,
            ativo,
            personal
        } = req.body;

        let dados = {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep
        }

        let endereco = {
            cod:cep,
            longra,
            bairro,
            cidade,
            uf
        }

        let ativa = {
            ativo,
            personal,
            aluno:id
        }

        try {

            endereco = await CepService.insert(endereco);

            await CPF.verificaCPF(cpf);

            await PersonalAlunoService.ativa_aluno(ativa);

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
}

module.exports = new AlunoController();