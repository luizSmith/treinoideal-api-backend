'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CEPs', {
      cd_cep: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nm_longradouro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nm_bairro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nm_cidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sg_uf: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'UFs',
          key: 'sg_uf'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CEPs');
  }
};