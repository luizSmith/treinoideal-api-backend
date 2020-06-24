const Database = require("../models/index");

class ExercicioService {
    constructor() {
        this.Exercicio = Database["tb_exercicio"];
        this.Aparelho = Database["tb_aparelho"];
        this.sequelize = Database.sequelize;
        this.QueryTypes = Database.sequelize.QueryTypes;
    }

    async lista() {
        let result = await this.sequelize.query(`
            SELECT
                e.cd_exercicio codigo,
                e.nm_exercicio nome,
                a.nm_aparelho aparelho
            FROM
                tb_exercicio e
            INNER JOIN
                tb_aparelho a ON e.cd_aparelho = a.cd_aparelho
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
                e.cd_exercicio codigo,
                e.nm_exercicio nome,
                a.nm_aparelho aparelho
            FROM
                tb_exercicio e
            INNER JOIN
                tb_aparelho a ON e.cd_aparelho = a.cd_aparelho
            WHERE
                e.cd_exercicio = :exercicio
            `,
            {
                replacements: { exercicio: id },
                type: this.QueryTypes.SELECT,
                raw: true
            }
        );

        return result;
    }
}

module.exports = new ExercicioService();