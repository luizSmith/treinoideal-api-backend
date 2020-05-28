'use strict';
module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define('tb_horario', {
    cd_aluno: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    cd_personal:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Código do personal não pode ser nulo"
        }
      }
    },
    cd_aluno:{
        type:DataTypes.INTEGER,
    },
    hr_inicial:{
      type:DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "hora inicial não pode ser nula"
        }
      }
    },
    hr_final:{
        type:DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "hora final não pode ser nula"
          }
        }
    },
    dd_semana:{
        type:DataTypes.STRING(1),
        allowNull: false,
        validate: {
            isIn: [['1','2','3','4','5','6','7']],            
            notEmpty: {
                msg: " não pode ser nula"
            }
        }
    },
    ic_disponivel:{
        type:DataTypes.STRING(1),
        allowNull: false,
        validate: {
            isIn: [['0','1']],
            notEmpty: {
                msg: "hora final não pode ser nula"
            }
        }
    }
  }, {});
  Horario.associate = function(models) {
    // associations can be defined here
    Horario.belongsTo(models.tb_personal,{
      foreignKey: 'cd_personal',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    Horario.belongsTo(models.tb_aluno,{
        foreignKey: 'cd_aluno',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  };
  return Horario;
};