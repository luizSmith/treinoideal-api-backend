'use strict';
module.exports = (sequelize, DataTypes) => {
  const PersonalAluno = sequelize.define('tb_personal_aluno', {
    cd_personal_aluno: {
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
          msg: "código do personal n?o pode ser nulo"
        }
      }
    },
    cd_aluno:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: "código do personal n?o pode ser nulo"
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
  PersonalAluno.associate = function(models) {
    // associations can be defined here
    PersonalAluno.belongsTo(models.tb_personal,{
      foreignKey: 'cd_personal',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    PersonalAluno.belongsTo(models.tb_aluno,{
        foreignKey: 'cd_aluno',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      PersonalAluno.hasMany(models.tb_horario, {
        foreignKey: 'cd_personal_aluno',
        onDelete: 'CASCADE'
      });
  };
  return PersonalAluno;
};