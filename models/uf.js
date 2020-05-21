'use strict';
module.exports = (sequelize, DataTypes) => {
  const UF = sequelize.define('tb_uf', {
    sg_uf: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(2)
    },
    nm_estado:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Nome do estado não pode ser nulo"
        }
      }
    }
  }, {});
  UF.associate = function(models) {
    // associations can be defined here
    UF.hasMany(models.tb_cep, {
      foreignKey: 'sg_uf',
      onDelete: 'CASCADE'
    });
  };
  return UF;
};