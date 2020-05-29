const Database = require("../models/index");

class AparelhoService {
    constructor() {
        this.Aparelho = Database["tb_aparelho"];
    }

    async lista() {
        let result = await this.Aparelho.findAll({
            attributes: [
                ['cd_aparelho','codigo'],
                ['nm_aparelho','exercicio']
            ]
        });
        return result;
    }

    async detalhes (id) {
        let result = await this.Aparelho.findByPk(id,{
            attributes: [
                ['cd_aparelho','codigo'],
                ['nm_aparelho','exercicio'],
                ['ds_aparelho','descricao']
            ]
        });
        return result;
    }
}

module.exports = new AparelhoService();