'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistorialContrato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistorialContrato.belongsTo(models.ContratoEmpenio, { as: "ContratoEmpenio", foreignKey: "id_contrato" });
    }
  };
  HistorialContrato.init({
    id_contrato: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inicial: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fecha_inicial: {
      type: DataTypes.DATE,
      allowNull: false
    },
    renovacion: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fecha_renovacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    abono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    restante: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'HistorialContrato',
  });
  return HistorialContrato;
};