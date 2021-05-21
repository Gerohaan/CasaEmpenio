'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HistorialContratos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_contrato: {
        type: Sequelize.INTEGER,
        references: {
          model: "contratoempenios",
          key: "id"
        }
      },
      inicial: {
        type: Sequelize.BOOLEAN
      },
      fecha_inicial: {
        type: Sequelize.DATE
      },
      renovacion: {
        type: Sequelize.BOOLEAN
      },
      fecha_renovacion: {
        type: Sequelize.DATE
      },
      abono: {
        type: Sequelize.STRING
      },
      restante: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HistorialContratos');
  }
};