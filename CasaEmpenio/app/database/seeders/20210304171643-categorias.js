'use strict';

const { Categoria } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return Promise.all([

      Categoria.create({

        nombre: "Electrodomesticos",
        descripcion: "Equipos empleados en las tareas del hogar.",
        status: "ACTIVA",
        createdAt: new Date(),
        updatedAt: new Date()

      }),
      
      Categoria.create({

        nombre: "Tecnoligia/Informatica",
        descripcion: "Equipos empleados en el area de la informatica, computacion y para soluciones tecnologicas.",
        status: "ACTIVA",
        createdAt: new Date(),
        updatedAt: new Date()


      })

    ]);

  },

  down: async (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.bulkDelete('categoria', null, {}),
    ]);


  }
};
