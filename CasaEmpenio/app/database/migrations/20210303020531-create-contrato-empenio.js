'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContratoEmpenios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_contrato: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "clientes",
          key: "id"
        }
      },
      id_articulo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "articulos",
          key: "id"
        }
      },
      cantidad_articulo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      precio_venta: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gastos_costos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_cancelar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tipo_contrato: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero_dias: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      condiciones_particulares: {
        type: Sequelize.STRING
      },
      origen_adquisicion: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContratoEmpenios');
  }
};