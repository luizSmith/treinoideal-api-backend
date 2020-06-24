'use strict';
module.exports = (sequelize, DataTypes) => {
  const AulaExercicio = sequelize.define('tb_aula_exercicio', {
    cd_aula: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: {
                msg: "Códio aula não pode ser nulo"
            }
        }
    },
    cd_exercicio: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: {
                msg: "Códio exercicio não pode ser nulo"
            }
        }
    },
    qt_repeticao:{
        type: DataTypes.FLOAT(12),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Repetição não pode ser nulo"
            }
        }
    },
    qt_peso:{
        type:DataTypes.FLOAT(11,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Peso não pode ser nulo"
            }
        }
    },
    ic_feito:{
        type:DataTypes.STRING,
        validate: {
            isIn:{
                args:[['0','1']],
                msg: "O valor tem que ser 0 ou 1"
            },
        }
    }
  }, {});

  AulaExercicio.removeAttribute('id');
  
  AulaExercicio.associate = function(models) {
    // associations can be defined here
    AulaExercicio.belongsTo(models.tb_aula,{
      foreignKey: 'cd_aula',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    AulaExercicio.belongsTo(models.tb_exercicio,{
        foreignKey: 'cd_exercicio',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });
    
  };
  
  return AulaExercicio;

};