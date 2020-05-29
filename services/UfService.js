const Database = require("../models/index");

class UfService {
    constructor() {
        this.Uf = Database["tb_uf"];
    }

    async lista() {
        let result = await this.Uf.findAll({
            attributes: [
                ['sg_uf', 'sigla'],
                ['nm_estado','estado']
            ]
        });
        return result;
    }

    async detalhes (id) {
        let result = await this.Uf.findByPk(id,{
            raw:true,
            attributes: [
                ['sg_uf', 'sigla'],
                ['nm_estado','estado']
            ]
        });
        return result;
    }
}

module.exports = new UfService();