const Database = require("../models/index");

class HorarioService {
    constructor() {
        this.Horario = Database["tb_horario"];
    }

    async insert(horario) {
        let {
            aluno,
            personal,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = horario;

        let hor = {
            cd_aluno:aluno,
            cd_personal:personal,
            hr_inicial:hora_inicial,
            hr_final:hora_final,
            dd_semana:dia_semana,
            ic_disponivel:disponivel
        };

        let result = await this.Horario.create(hor);
        return result;
        
    }
    
    async lista(){
        let result = await this.Horario.findAll();
        return result;
    }
    async detalhes (id) {
        let result = await this.Horario.findByPk(id);
        return result;
    }

    async atualiza(id,horario) {

        let {
            aluno,
            personal,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = horario;
        
        let dados = {
            cd_aluno:aluno,
            cd_personal:personal,
            hr_inicial:hora_inicial,
            hr_final:hora_final,
            dd_semana:dia_semana,
            ic_disponivel:disponivel
        };

        let result = await this.Horario.update(dados,{
            where: {
                cd_horario: id
            }
        });
        return result;
    }

    async deleta(id) {
        let result = await this.Horario.destroy({
            where: {
                cd_horario: id
            }
        });
        return result;
    }

}

module.exports = new HorarioService();