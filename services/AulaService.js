const Database = require("../models/index");

class AulaService {
    constructor() {
        this.Aula = Database["tb_aula"];
    }

    async lista() {
        let result = this.Aula.findAll({
            attributes: [
                ['cd_aula','codigo'], 
                ['dt_aula', 'data'],
                ['ic_feito', 'feita'],
                ['cd_horario', 'horario']
            ]
        });
        return result;
    }

    async lista() {
        let result = this.Aula.findAll({
            attributes: [
                ['cd_aula','codigo'], 
                ['dt_aula', 'data'],
                ['ic_feito', 'feita'],
                ['cd_horario', 'horario']
            ]
        });
        return result;
    }

    async detalhes (id) {
        let result = await this.Aula.findByPk(id,{
            attributes: [
                ['cd_aula','codigo'], 
                ['dt_aula', 'data'],
                ['ic_feito', 'feita'],
                ['cd_horario', 'horario']
            ]
        });
        return result;
    }

    async insert(aula) {
        let {
            data,
            horario
        } = aula;

        let dados = {
            dt_aula:data,
            cd_horario:horario
        }

        let result = await this.Aula.create(dados);

        result = {
            codigo:result.cd_aula,
            data:result.dt_aula,
            realizada:result.ic_feito,
            codigo_horario:result.cd_horario
        };

        return result;
    }

    async atualiza(id,aula) {

        let {
            data,
            horario,
            feito
        } = aula;

        let dados = {
            dt_aula:data,
            cd_horario:horario,
            ic_feito:feito
        }

        let result = await this.Aula.update(dados,{
            where: {
                cd_aula: id
            }
        });
        return result;
    }

    async deleta(id) {
        let result = await this.Aula.destroy({
            where: {
                cd_aula: id
            }
        });
        return result;
    }
}

module.exports = new AulaService();