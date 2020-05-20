'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercicio = sequelize.define('Exercicio', {
    cd_exercicio: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nm_exercicio: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: {
            msg: "Nome Não pode ser nulo"
          }
      }
    },
    ds_exercicio: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
          notEmpty: {
            msg: "Descrição Não pode ser nulo"
          }
      }
    },
    cd_aparelho: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Código do aparelho Não pode ser nulo"
        }
      }
    }
  }, {});
  Exercicio.associate = function(models) {
    // associations can be defined here
    Exercicio.belongsTo(models.Aparelho,{
      foreignKey: 'cd_aparelho',
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  };
  return Exercicio;
};