'use strict';

const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Aula = sequelize.define('tb_aula', {
    cd_aula: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dt_aula: {
      type:DataTypes.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('dt_aula')).format('DD/MM/YYYY');
      },
      validate: {
          isDate:{
              msg: "Tem que ser uma data valida"
          },
          notEmpty: {
            msg: "Data Aula Não pode ser nula"
          }
      }
    },
    ic_feito:{
        type:DataTypes.INTEGER(1),
        validate: {
            isIn: [['0','1']]
        }
    },
    cd_horario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Código do horario Não pode ser nulo"
        }
      }
    }
  }, {});
  Aula.associate = function(models) {
    // associations can be defined here
    Aula.belongsTo(models.tb_horario,{
      foreignKey: 'cd_horario',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  };
  return Aula;
};