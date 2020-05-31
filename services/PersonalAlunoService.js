const Database = require("../models/index");

class PersonalAlunoService {
    constructor() {
        this.PersonalAluno = Database["tb_personal_aluno"];
    }

    async insert(dados) {

        let associacao = {
            cd_aluno:dados.aluno,
            cd_personal:dados.personal
        }

        let result = await this.PersonalAluno.create(associacao);

        return result;
    }

    async lista(dados) {

        if (dados != undefined) {
            dados = {
                where:dados
            };
        }

        let result = await this.PersonalAluno.findAll(dados);
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