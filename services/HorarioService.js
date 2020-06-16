const Database = require("../models/index");

class HorarioService {
    constructor() {
        this.Horario = Database["tb_horario"];
        this.Personal = Database['tb_personal'];
        this.Aluno = Database['tb_aluno'];
        this.Associacao = Database['tb_personal_aluno'];
        this.sequelize = Database.sequelize;
        this.QueryTypes = Database.sequelize.QueryTypes;
    }

    async insert(horario) {
        let {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = horario;

        let hora = {
            cd_personal_aluno:associacao,
            hr_inicial:hora_inicial,
            hr_final:hora_final,
            dd_semana:dia_semana,
            ic_disponivel:disponivel
        };

        let result = await this.Horario.create(hora);
        result = {
            codigo:result.cd_horario,
            associacao:result.cd_personal_aluno,
            inicio:result.hr_inicial,
            final:result.hr_final,
            dia_semana:result.dd_semana
        };
        return result;
        
    }
    
    async lista(id){
        let result = await this.Horario.findAll({
            attributes: [              
                ['cd_horario','codigo'], 
                [Database.Sequelize.fn('date_format', Database.Sequelize.col('hr_inicial'), '%T'), 'inicio'],
                [Database.Sequelize.fn('date_format', Database.Sequelize.col('hr_final'), '%T'), 'final'],
                ['dd_semana', 'dia_semana']
            ],
            include: [{ 
                model: this.Associacao,
                required: true,
                attributes: [
                    ['cd_personal_aluno', 'associacao']
                ],
                include:[{
                    model: this.Personal,
                    required:true,
                    attributes: [
                        ['cd_personal', 'codigo'],
                        ['nm_personal','nome']
                    ],
                    where:{
                        cd_personal:id
                    }
                },{
                    model: this.Aluno,
                    required:true,
                    attributes: [
                        ['cd_aluno', 'codigo'],
                        ['nm_aluno','nome']
                    ]
                }]
            }]
        });
        return result;
    }

    async detalhes (id) {
        let result = await this.Horario.findByPk(id,{
            attributes: [
                ['cd_horario','codigo'], 
                [Database.Sequelize.fn('date_format', Database.Sequelize.col('hr_inicial'), '%T'), 'inicio'],
                [Database.Sequelize.fn('date_format', Database.Sequelize.col('hr_final'), '%T'), 'final'],
                ['dd_semana', 'dia_semana']
            ],
            include: [{ 
                model: this.Associacao,
                required: true,
                attributes: [
                    ['cd_personal_aluno', 'associacao']
                ],
                include:[{
                    model: this.Personal,
                    required:true,
                    attributes: [
                        ['cd_personal', 'codigo'],
                        ['nm_personal','nome']
                    ]
                },{
                    model: this.Aluno,
                    required:true,
                    attributes: [
                        ['cd_aluno', 'codigo'],
                        ['nm_aluno','nome']
                    ]
                }]
            }]
        });
        return result;
    }

    async atualiza(id,horario) {

        let {
            associacao,
            hora_inicial,
            hora_final,
            dia_semana,
            disponivel
        } = horario;
        
        let dados = {
            cd_personal_aluno:associacao,
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