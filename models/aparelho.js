'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aparelho = sequelize.define('tb_aparelho', {
    cd_aparelho: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nm_aparelho: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Nome do aparelho Não pode ser nulo"
        }
      }
    }, 
    ds_aparelho: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Descrição Não pode ser nula"
        }
      }
    } 
  }, {});
  Aparelho.associate = function(models) {
    // associations can be defined here
    Aparelho.hasMany(models.tb_exercicio, {
      foreignKey: 'cd_aparelho',
      onDelete: 'CASCADE'
    });
  };
  return Aparelho;
};