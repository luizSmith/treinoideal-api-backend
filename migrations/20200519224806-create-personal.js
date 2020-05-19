'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Personals', {
      cd_personal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nm_personal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nm_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nm_senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cd_cref: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Personals');
  }
};