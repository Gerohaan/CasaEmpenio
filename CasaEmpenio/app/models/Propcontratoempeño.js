'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropContratoEmpeño extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PropContratoEmpeño.init({
    dias_contrato: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    porcentaje_interes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dias_prorroga: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'PropContratoEmpeño',
  });
  return PropContratoEmpeño;
};