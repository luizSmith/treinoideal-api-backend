const Database = require("../models/index");
const UfService = require("./UfService");

class CepService {
    constructor() {
        this.Cep = Database["tb_cep"];
        this.UF = Database["tb_uf"];
    }

    async insert(personal) {
        let {cod, longra, bairro, cidade, uf} = personal;

        let cep = {
            cd_cep:cod,
            nm_longradouro:longra,
            nm_bairro:bairro,
            nm_cidade:cidade,
            sg_uf:uf
        };

        let dados = await this.verificaCEP(cep);

        let result = {
            cep:dados.cep,
            longradouro:dados.longradouro,
            bairro:dados.bairro,
            cidade:dados.cidade
        }

        return result;        
    }
    
    async lista() {
        let result = await this.Cep.findAll({
            attributes: [
                ['cd_cep', 'cep'],
                ['nm_longradouro','longradouro'],
                ['nm_bairro','bairro'],
                ['nm_cidade','cidade']
            ],
            include: [ {
                model:this.UF,
                required: true,
                attributes: [
                    ['sg_uf', 'sigla'],
                    ['nm_estado','estado']
                ],
            } ]
        });
        return result;
    }

    async detalhes (id) {
        let result = await this.Cep.findByPk(id,{
            raw:true,
            attributes: [
                ['cd_cep', 'cep'],
                ['nm_longradouro','longradouro'],
                ['nm_bairro','bairro'],
                ['nm_cidade','cidade']
            ],
            include: [ {
                model:this.UF,
                required: true,
                attributes: [
                    ['sg_uf', 'sigla'],
                    ['nm_estado','estado']
                ],
            } ]
        });
        return result;
    }

    async atualiza(id,dados) {
        let result = await this.Cep.update(dados,{
            where: {
                cd_cep: id
            }
        });
        return result;
    }

    async deleta(id) {
        let result = await this.Cep.destroy({
            where: {
                cd_cep: id
            }
        });
        return result;
    }

    async verificaUF(uf) {
        
        let resposta = await UfService.detalhes(uf);
        
        if (resposta == undefined) {

            resposta = {
                "name": "ErroProcesso",
                "errors":[{
                    "message": "Estado Inválido"
                }]
            };
            throw resposta;
        }

        return resposta;
    }

    async verificaCEP(dados) {

        let resposta = await this.detalhes(dados.cd_cep);
        
        if (resposta == undefined) {

            dados = await this.Cep.create(dados);

            resposta = {
                cep:dados.cd_cep,
                longradouro:dados.nm_longradouro,
                bairro:dados.nm_bairro,
                cidade:dados.nm_cidade
            }

        }

        return resposta;       
    }

}

module.exports = new CepService();