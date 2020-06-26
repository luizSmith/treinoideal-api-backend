'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('tb_log', {
    cd_log: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nm_jwt: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Token não pode ser nulo"
          }
        }
    },
    nm_tipo:{
        type:DataTypes.STRING(15),
        allowNull: false,
        validate: {
            isIn: [['personal','aluno']]
        }
    },
    dt_log: {
      type:DataTypes.DATEONLY,
      allowNull: false,
      get() {
        return moment(this.getDataValue('dt_log')).format('DD/MM/YYYY hh:mm:ss');
      },
      validate: {
          isDate:{
              msg: "Tem que ser uma data valida"
          },
          notEmpty: {
            msg: "Data Log Não pode ser nula"
          }
      }
    },
    ic_ativo:{
        type:DataTypes.STRING(1),
        validate: {
            isIn: [['0','1']]
        }
    }
  }, {});
  Log.associate = function(models) {
    // associations can be defined here
  };
  return Log;
};