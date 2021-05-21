'use strict';

const { ContratoEmpenio } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return Promise.all([

      ContratoEmpenio.create({
        numero_contrato: "000001",
        id_cliente: 1,
        id_articulo: 1,
        cantidad_articulo: "1",
        precio_venta: "50",
        gastos_costos: "10",
        total_cancelar: "60",
        tipo_contrato: "empeño",
        numero_dias: 21,
        condiciones_particulares: "N/A",
        origen_adquisicion: "compras particulares",
        status: "ABIERTO",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),

      ContratoEmpenio.create({
        numero_contrato: "000002",
        id_cliente: 2,
        id_articulo: 2,
        cantidad_articulo: "1",
        precio_venta: "50",
        gastos_costos: "10",
        total_cancelar: "60",
        tipo_contrato: "empeño",
        numero_dias: 21,
        condiciones_particulares: "N/A",
        origen_adquisicion: "compras particulares",
        status: "ABIERTO",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),

    ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.bulkDelete('contratoempenios', null, {})
    ]);

  }
};
