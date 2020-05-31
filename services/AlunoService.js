const Database = require("../models/index");
const bcrypt = require('bcryptjs');
const CepService = require("./CepService");

class AlunoService {
    constructor() {
        this.Aluno = Database["tb_aluno"];
        this.Cep = Database["tb_cep"];
        this.UF = Database["tb_uf"];
        
    }

    async insert(aluno) {
        let {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep,
            personal
        } = aluno;

        senha = await this.encripta(senha);

        let dados = {
            nm_aluno:nome,
            dt_nascimento:nascimento,
            cd_cpf:cpf,
            nm_email:email,
            nm_senha:senha,
            cd_endereco:numero_endereco,
            cd_cep:cep
        }


        try {

            aluno = await this.Aluno.create(dados);
            
        } catch(erro) {
            throw erro;
        }

        let result = {
            codigo:aluno.cd_aluno,
            nome:aluno.nm_aluno,
            nascimento:aluno.dt_nascimento,
            cpf:aluno.cd_cpf,
            email:aluno.nm_email,
            numero:aluno.cd_endereco,
        };

        return result;
        
    }
 
    async lista() {
        let result = await this.Aluno.findAll({
            attributes: [
                ['cd_aluno','codigo'], 
                ['nm_aluno', 'nome'],
                ['nm_email', 'email'],
                ['dt_nascimento', 'nascimento'],
                ['cd_cpf', 'cpf'],
                ['cd_endereco', 'numero']
            ],
            include: [ { 
                model: this.Cep,
                required: true,
                
                attributes: [
                    ['cd_cep', 'cep'],
                    ['nm_longradouro','longradouro'],
                    ['nm_bairro','bairro'],
                    ['nm_cidade','cidade']
                ],
                include: [ {
                    model:this.UF,
                    required: true,
                    attributes: [
                        ['sg_uf', 'sigla'],
                        ['nm_estado','estado']
                    ],
                } ]
                
            } ]
          });
        return result;
    }

    async detalhes (id) {
        let result = await this.Aluno.findByPk(id,{
            attributes: [
                ['cd_aluno','codigo'], 
                ['nm_aluno', 'nome'],
                ['nm_email', 'email'],
                ['dt_nascimento', 'nascimento'],
                ['cd_cpf', 'cpf'],
                ['cd_endereco', 'numero']
            ],
            include: [ { 
                model: this.Cep,
                required: true,
                attributes: [
                    ['cd_cep', 'cep'],
                    ['nm_longradouro','longradouro'],
                    ['nm_bairro','bairro'],
                    ['nm_cidade','cidade']
                ],
                include: [ {
                    model:this.UF,
                    required: true,
                    attributes: [
                        ['sg_uf', 'sigla'],
                        ['nm_estado','estado']
                    ],
                } ]
                
            } ]
          });
        return result;
    }

    async atualiza(id,dados) {
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
        } = dados;

        try {

            senha = await this.encripta(senha);

            let aluno = {
                nm_aluno:nome,
                dt_nascimento:nascimento,
                cd_cpf:cpf,
                nm_email:email,
                nm_senha:senha,
                cd_endereco:numero_endereco,
                cd_cep:cep,
            }

            let result = await this.Aluno.update(aluno,{
                where: {
                    cd_aluno: id
                }
            });
            return result;
        }catch(erro) {
            throw erro;
        }
    }

    async deleta(id) {
        let result = await this.Aluno.destroy({
            where: {
                cd_aluno: id
            }
        });
        return result;
    }

    async encripta(senha) {
        if (senha != undefined) {
            let salt = bcrypt.genSaltSync(10);
            senha = bcrypt.hashSync(senha,salt);
        }

        return senha;
    }

}

module.exports = new AlunoService();