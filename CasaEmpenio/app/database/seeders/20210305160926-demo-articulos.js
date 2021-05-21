'use strict';

const { Articulo } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      return Promise.all([

        Articulo.create({
          nombre: "Plancha",
          id_categoria: 1,
          descripcion: "Plancha para ropa marca Oster, color blanco.",
          precio: "50",
          cantidad: 1,
          status: "ACTIVO",
          createdAt: new Date(),
          updatedAt: new Date()
        }),

        Articulo.create({
          nombre: "Computadora Portatil",
          id_categoria: 2,
          descripcion: "Laptop color negra marca VIT, modelo P2400 en optimas condiciones con su respectivo cargador.",
          precio: "100",
          cantidad: 1,
          status: "ACTIVO",
          createdAt: new Date(),
          updatedAt: new Date()
        })

      ]);

  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.bulkDelete('articulos', null, {}),
    ]);

  }
};
