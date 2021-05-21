'use strict';

//const { User } = require('../../models/index');
const { Categoria } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('categoria', [
      {
      nombre: "Electrodomesticos",
      descripcion: "Equipos empleados en las tareas del hogar.",
      status: "ACTIVA",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: "Tecnoligia/Informatica",
      descripcion: "Equipos empleados en el area de la informatica, computacion y para soluciones tecnologicas.",
      status: "ACTIVA",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('categoria', null, {});


  }
};
