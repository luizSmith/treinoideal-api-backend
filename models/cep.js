'use strict';
module.exports = (sequelize, DataTypes) => {
  const CEP = sequelize.define('CEP', {
    cd_cep: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: "Sigla estado não pode ser nulo"
        }
      }
    },
    nm_longradouro:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Longradouro não pode ser nulo"
        }
      }
    },
    nm_bairro:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Bairro não pode ser nulo"
        }
      }
    },
    nm_cidade:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nome da cidade não pode ser nulo"
        }
      }
    }
  }, {});
  CEP.associate = function(models) {
    // associations can be defined here
    CEP.belongsTo(models.UF,{
      foreignKey: 'sg_uf',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };
  return CEP;
};