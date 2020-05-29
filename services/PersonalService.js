const Database = require("../models/index");
const bcrypt = require('bcryptjs');

class PersonalService {
    constructor() {
        this.Personal = Database["tb_personal"];
    }

    async insert(personal) {
        let {nome, email, senha, data, cref} = personal;

        senha = await this.encripta(senha);

        let dados = {
            nm_personal:nome,
            nm_email:email,
            nm_senha:senha,
            dt_nascimento:data,
            cd_cref:cref
        };

        let result = await this.Personal.create(dados);
        return result;
    }

    async lista() {
        let result = await this.Personal.findAll({
            attributes: [
                ['cd_personal','codigo'], 
                ['nm_personal', 'nome'],
                ['nm_email', 'email'],
                ['dt_nascimento', 'nascimento'],
                ['cd_cref', 'cref'],
            ]
          });
        return result;
    }

    async detalhes (id) {
        let result = await this.Personal.findByPk(id,{
            attributes: [
                ['cd_personal','codigo'], 
                ['nm_personal', 'nome'],
                ['nm_email', 'email'],
                ['dt_nascimento', 'nascimento'],
                ['cd_cref', 'cref'],
            ]
        });
        return result;
    }

    async atualiza(id,personal) {

        let {nome, email, senha, data} = personal;

        senha = await this.encripta(senha);

        let dados = {
            nm_nome:nome,
            nm_email:email,
            nm_senha:senha,
            dt_nascimento:data
        };

        let result = await this.Personal.update(dados,{
            where: {
                cd_personal: id
            }
        });
        return result;
    }

    async deleta(id) {
        let result = await this.Personal.destroy({
            where: {
                cd_personal: id
            }
        });
        return result;
    }

    async encripta(senha) {
        if (senha != undefined) {
            let salt = bcrypt.genSaltSync(10);
            senha = bcrypt.hashSync(senha,salt);
        }

        return senha;
    }
}

module.exports = new PersonalService();