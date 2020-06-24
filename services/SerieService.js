const Database = require("../models/index");

class SerieService {
    constructor() {
        this.Serie = Database["tb_aula_exercicio"];
        this.sequelize = Database.sequelize;
        this.QueryTypes = Database.sequelize.QueryTypes;
    }

    async lista() {
        let result = await this.Serie.findAll({
            attributes: [
                ['cd_aula','aula'], 
                ['cd_exercicio', 'exercicio'],
                ['qt_repeticao', 'repeticao'],
                ['qt_peso', 'peso'],
                ['ic_feito', 'feito'],
            ]
        });
        return result;
    }

    async insert(dados) {
        let {
            aula,
            exercicio,
            repeticao,
            peso
        } = dados;

        let serie = {
            cd_aula:aula,
            cd_exercicio:exercicio,
            qt_repeticao:repeticao,
            qt_peso:peso,
            ic_feito:0
        };

        let result = await this.Serie.create(serie);

        result = {
            aula:result.cd_aula,
            exercicio:result.cd_exercicio,
            repeticao:result.qt_repeticao,
            peso:result.qt_peso
        };
        
        return result;
    }

}

module.exports = new SerieService();