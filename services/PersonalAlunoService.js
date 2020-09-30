const Database = require("../models/index");

class PersonalAlunoService {
    constructor() {
        this.PersonalAluno = Database["tb_personal_aluno"];
        this.sequelize = Database.sequelize;
        this.QueryTypes = Database.sequelize.QueryTypes;
    }

    async insert(dados) {

        let associacao = {
            cd_aluno:dados.aluno,
            cd_personal:dados.personal
        }

        let result = await this.PersonalAluno.create(associacao);

        result = {
            associacao:result.cd_personal_aluno,
            personal:result.cd_personal,
            aluno:result.cd_aluno
        };

        return result;
    }

    async lista(personal) {

        let result = await this.sequelize.query(`
                SELECT
                    a.cd_personal_aluno codigo_associacao,
                    al.cd_aluno codigo_aluno,
                    al.nm_aluno nome_aluno,
                    al.cd_cpf cpf_aluno
                FROM
                    tb_personal_aluno a
                INNER JOIN
                    tb_aluno al ON a.cd_aluno = al.cd_aluno
                WHERE
                    a.cd_personal = :personal
            `,
            {
                replacements: { personal: personal },
                type: this.QueryTypes.SELECT,
                raw: true
            }
        );
    
        return result;
    }

    async ativa_aluno(dados) {
        try {
            let result = await this.PersonalAluno.update({
                ic_ativo:dados.ativo
            },{
                where: {
                    cd_aluno: dados.aluno,
                    cd_personal:dados.personal
                }
            });
            return result;
        } catch(erro) {
            throw "Arro na ativação";
        }
    }
}
module.exports = new PersonalAlunoService();