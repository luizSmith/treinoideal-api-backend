const AlunoService = require("../services/AlunoService");
const CepService = require("../services/CepService");
const PersonalAlunoService = require("../services/PersonalAlunoService");
const ResponseValidation = require("../Validation/ResponseValidation");
const PersonalService = require('../services/PersonalService');
const CPF = require('../Validation/CPFValidation');

class AlunoController {

    async index(req, res) {
        try {
            let result = await AlunoService.lista();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
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
            await PersonalService.personalExists(personal);

            endereco = await CepService.insert(endereco);

            await CPF.verificaCPF(cpf);

            aluno = await AlunoService.insert(aluno);

            let result = {...aluno,...endereco};

            let associacao = {
                aluno:result.codigo,
                personal:personal,
            }

            associacao = await PersonalAlunoService.insert(associacao);

            associacao.aluno = result;

            result = associacao;
            
            await ResponseValidation.insert(result,res);
            res.json(result);
        } catch(err) {
            res.status(400).json(err);
        }
        
    }

    async detals(req, res) {
        let id = req.params.id;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await AlunoService.detalhes(id);
            await ResponseValidation.detalhes(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async update(req, res) {
        let id = req.params.id;

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
            await ResponseValidation.validaNumber(id,res);

            await PersonalService.personalExists(personal);

            endereco = await CepService.insert(endereco);

            await CPF.verificaCPF(cpf);

            await PersonalAlunoService.ativa_aluno(ativa);

            let result = await AlunoService.atualiza(id,dados);
            await ResponseValidation.update(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    async delete(req, res) {
        let id = req.params.id;

        try {
            await ResponseValidation.validaNumber(id,res);

            let result = await AlunoService.deleta(id);
            await ResponseValidation.delete(result,res);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

module.exports = new AlunoController();