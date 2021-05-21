'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContratoEmpenio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //ContratoEmpenio.belongsToMany(models.Cliente, { as: "cliente", through: "clientes", foreignKey: "id_cliente" });
      ContratoEmpenio.belongsTo(models.Articulo, { as: "articulo", foreignKey: "id_articulo" });
      ContratoEmpenio.belongsTo(models.Cliente, { as: "cliente", foreignKey: "id_cliente" });
    }
  };
  ContratoEmpenio.init({
    numero_contrato: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_articulo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_articulo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_venta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gastos_costos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_cancelar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_contrato: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero_dias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    condiciones_particulares: {
      type: DataTypes.STRING,
      allowNull: true
    },
    origen_adquisicion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ContratoEmpenio',
  });
  return ContratoEmpenio;
};