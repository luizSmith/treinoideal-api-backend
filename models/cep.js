'use strict';
module.exports = (sequelize, DataTypes) => {
  const CEP = sequelize.define('tb_cep', {
    cd_cep: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "CEP estado não pode ser nulo"
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
    CEP.belongsTo(models.tb_uf,{
      foreignKey: 'sg_uf',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    CEP.hasMany(models.tb_aluno, {
      foreignKey: 'cd_cep',
      onDelete: 'CASCADE'
    });
  };
  return CEP;
};