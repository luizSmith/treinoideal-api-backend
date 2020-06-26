const Database = require("../models/index");

class TokenService {
    constructor() {
        this.Token = Database["tb_log"];
        this.sequelize = Database.sequelize;
        this.QueryTypes = Database.sequelize.QueryTypes;
    }

    async insert(token) {
        let result = await this.Token.create({
            nm_jwt:token,
            nm_tipo:"personal",
            dt_log: new Date(),
            ic_ativo: String(1)
        });

        return result;
    }

    async findToken(token) {

        let result = await this.sequelize.query(`
            SELECT 
                l.cd_log codigo, 
                l.nm_jwt token
            FROM 
                tb_log l
            WHERE 
                l.nm_jwt = :token
                AND 
                l.ic_ativo = '1'
            `,
            {
                replacements: { token: token },
                type: this.QueryTypes.SELECT,
                raw: true
            }
        );

        if (result.length > 0) {  

            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            this.Token.update({
                dt_log: `${date} ${time}`
            },{
                where: {
                    cd_log:result[0].codigo
                }                
            });

        } else {
            throw {
                "name": "AutenticacaoFalha",
                "errors":[{
                    "message": "Token not found"
                }]
            }
        }

        return result;
    }

    async desativa_log(token) {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let result = await this.Token.update({
                dt_log: `${date} ${time}`,
                ic_ativo: 0 
            },{
                where: {
                    nm_jwt:token
                }                
        });

        return result;
    }

    async lista() {
        let result = await this.Token.findAll();
        return result;
    }

    async detalhes (id) {
        let result = await this.Token.findByPk(id);
        return result;
    }
}

module.exports = new TokenService();