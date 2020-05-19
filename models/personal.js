'use strict';
module.exports = (sequelize, DataTypes) => {
  const Personal = sequelize.define('Personal', {
    cd_personal: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nm_personal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nome Não pode ser nulo"
          }
        }
    },
    nm_email : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email Não pode ser nulo"
          },
          isEmail: {
            msg: 'Tem que ser um Email valido'
          }
        }
    },
    nm_senha : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Senha Não pode ser nul"
          },
        }
    },
    dt_nascimento : {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Data Não pode ser nula"
          }
        }
    },
    cd_cref : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Senha Não pode ser nul"
          }
        }
    }
  }, {});
  Personal.associate = function(models) {
    // associations can be defined here
  };
  return Personal;
};