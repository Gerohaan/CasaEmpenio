'use strict';

const { User } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');
 
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return Promise.all([

      User.create({
        name: "Gerohaan",
        email: "gerohaan29@gmail.com",
        password: bcrypt.hashSync("123456", +authConfig.rounds),
        posts: [
          {
            title: "Title 1",
            body: "Body 1"
          },
          {
            title: "Title 2",
            body: "Body 2"
          }
        ]
      }, {
        include: "posts"
      }),

      User.create({
        name: "Delfin",
        email: "Delfin29@gmail.com",
        password: bcrypt.hashSync("123456", +authConfig.rounds),
        posts: [
          {
            title: "Title 3",
            body: "Body 3"
          },
          {
            title: "Title 4",
            body: "Body 4"
          }
        ]
      }, {
        include: "posts"
      }),

    ]);

  },

  down: async (queryInterface, Sequelize) => {
   
    return Promise.all([
      queryInterface.bulkDelete('posts', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ]);

  }
};
