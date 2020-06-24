'use strict';
module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define('tb_horario', {
    cd_horario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
        validate: {
            isIn:{
                args:[['0','1']],
                msg: "O valor tem que ser 0 ou 1"
            },
        }
    },
    cd_personal_aluno:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {});
  Horario.associate = function(models) {
    // associations can be defined here
    Horario.belongsTo(models.tb_personal_aluno,{
        foreignKey: 'cd_personal_aluno',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
  };    
  return Horario;
};