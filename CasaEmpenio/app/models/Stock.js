'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.belongsToMany(models.Articulo, { as: "articulo", through: "articulos", foreignKey: "id_articulo" })
    }
  };
  Stock.init({
    id_articulo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_existente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unidad_medida: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};