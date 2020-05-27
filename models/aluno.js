'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('tb_aluno', {
    cd_aluno: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nm_aluno:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nome não pode ser nulo"
        }
      }
    },
    dt_nascimento:{
      type:DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Data de nascimento não pode ser nula"
        },
        isDate:{
            msg: "Tem que ser uma data valida"
        }
      }
    },
    cd_cpf:{
      type:DataTypes.STRING(14),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "CPF não pode ser nulo"
        }
      }
    },
    nm_email:{
        type:DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email não pode ser nulo"
          },
          isEmail: {
            msg: 'Tem que ser um Email valido'
          }
        }
      },
      nm_senha:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Senha não pode ser nula"
          }
        }
      },
      cd_endereco:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Numero da residencia não pode ser nula"
          }
        }
      },
      cd_cep: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Cep estado não pode ser nulo"
          }
        }
      }
  }, {});
  Aluno.associate = function(models) {
    // associations can be defined here
    Aluno.belongsTo(models.tb_cep,{
      foreignKey: 'cd_cep',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    Aluno.hasMany(models.tb_horario, {
      foreignKey: 'cd_aluno',
      onDelete: 'CASCADE'
    });
  };
  return Aluno;
};