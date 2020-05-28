const Database = require("../models/index");
const bcrypt = require('bcryptjs');
const CepService = require("./CepService");

class AlunoService {
    constructor() {
        this.Aluno = Database["tb_aluno"];
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
        let result = await this.Aluno.create(dados);
        result.cd_cep = endereco;
        return result;
        
    }
 
    async lista() {
        let result = await this.Aluno.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Aluno.findByPk(id);
        result.cd_cep = await CepService.detalhes(result.cd_cep);
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