'use strict';
module.exports = (sequelize, DataTypes) => {
  const Personal = sequelize.define('tb_personal', {
    nm_personal: DataTypes.STRING,
    nm_email: DataTypes.STRING,
    nm_senha: DataTypes.STRING,
    dt_nascimento: DataTypes.DATE,
    cd_cref: DataTypes.STRING
  }, {});
  Personal.associate = function(models) {
    // associations can be defined here
  };
  return Personal;
};