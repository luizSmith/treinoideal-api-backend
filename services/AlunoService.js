const Database = require("../models/index");
const bcrypt = require('bcryptjs');
const CepService = require("./CepService");

class AlunoService {
    constructor() {
        this.Aluno = Database["tb_aluno"];
        this.Cep = Database["tb_cep"];
        this.UF = Database["tb_uf"];
        this.sequelize = Database.sequelize;
        this.QueryTypes = Database.sequelize.QueryTypes;   
    }

    async insert(aluno) {
        let {
            nome,
            nascimento,
            cpf,
            email,
            senha,
            numero_endereco,
            cep
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

        aluno = await this.Aluno.create(dados);

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
        let result = await this.sequelize.query(`
            SELECT
                a.cd_aluno codigo,
                a.nm_aluno nome,
                a.nm_email email,
                DATE_FORMAT(a.dt_nascimento,"%d/%m/%Y") nascimento,
                a.cd_cpf cpf,
                a.cd_endereco numero,
                c.cd_cep cep,
                c.nm_longradouro longradouro,
                c.nm_bairro bairro,
                c.nm_cidade cidade,
                u.sg_uf sigla,
                u.nm_estado estado
            FROM
                tb_aluno a
            INNER JOIN
                tb_cep c ON a.cd_cep = c.cd_cep
            INNER JOIN
                tb_uf u ON c.sg_uf = u.sg_uf
            `,
            {
                type: this.QueryTypes.SELECT,
                raw: true
            }
        );

        return result;
    }

    async detalhes (id) {
        let result = await this.sequelize.query(`
            SELECT
                a.cd_aluno codigo,
                a.nm_aluno nome,
                a.nm_email email,
                DATE_FORMAT(a.dt_nascimento,"%d/%m/%Y") nascimento,
                a.cd_cpf cpf,
                a.cd_endereco numero,
                c.cd_cep cep,
                c.nm_longradouro longradouro,
                c.nm_bairro bairro,
                c.nm_cidade cidade,
                u.sg_uf sigla,
                u.nm_estado estado
            FROM
                tb_aluno a
            INNER JOIN
                tb_cep c ON a.cd_cep = c.cd_cep
            INNER JOIN
                tb_uf u ON c.sg_uf = u.sg_uf
            WHERE
                a.cd_aluno = :aluno
            `,
            {
                replacements: { aluno: id },
                type: this.QueryTypes.SELECT,
                raw: true
            }
        );
        
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
        } catch(erro) {
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