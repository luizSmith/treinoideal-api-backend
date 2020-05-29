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
            longra,
            bairro,
            cidade,
            uf
        } = aluno;

        senha = await this.encripta(senha);

        let dados = {
            nm_aluno:nome,
            dt_nascimento:nascimento,
            cd_cpf:cpf,
            nm_email:email,
            nm_senha:senha,
            cd_endereco:numero_endereco,
            cd_cep:cep,
        }

        let endereco = {
            cod:cep,
            longra,
            bairro,
            cidade,
            uf
        }

        endereco = await CepService.insert(endereco);
        aluno = await this.Aluno.create(dados);
        let result = {
            codigo:aluno.cd_aluno,
            nome:aluno.nm_aluno,
            nascimento:aluno.dt_nascimento,
            cpf:aluno.cd_cpf,
            email:aluno.nm_email,
            numero:aluno.cd_endereco,
            cep:{
                codigo:endereco.cd_cep,
                longradouro:endereco.nm_longradouro,
                bairro:endereco.nm_bairro,
                cidade:endereco.nm_cidade,
                sigla:endereco.sg_uf
            }
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

        let endereco = {
            cod:cep,
            longra,
            bairro,
            cidade,
            uf
        }

        await CepService.insert(endereco);
        let result = await this.Aluno.update(aluno,{
            where: {
                cd_aluno: id
            }
        });
        return result;
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