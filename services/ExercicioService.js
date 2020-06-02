const Database = require("../models/index");

class ExercicioService {
    constructor() {
        this.Exercicio = Database["tb_exercicio"];
        this.Aparelho = Database["tb_aparelho"];
    }

    async lista() {
        let result = await this.Exercicio.findAll({
            attributes: [
                ['cd_exercicio','codigo'],
                ['nm_exercicio','exercicio']
            ],
            include: [{
                model:this.Aparelho,
                required: true,
                attributes: [
                    ['nm_aparelho','exercicio']
                ]
            }]
        });
        return result;
    }

    async detalhes (id) {
        let result = await this.Exercicio.findByPk(id,{
            attributes: [
                ['cd_exercicio','codigo'],
                ['nm_exercicio','exercicio']
            ],
            include: [{
                model:this.Aparelho,
                required: true,
                attributes: [
                    ['cd_aparelho','codigo'],
                    ['nm_aparelho','exercicio']
                ]
            }]
        });
        if (result == undefined) {
            throw "Bad Request"
        }
        return result;
    }
}

module.exports = new ExercicioService();