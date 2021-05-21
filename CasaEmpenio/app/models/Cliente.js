'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.hasMany(models.ContratoEmpenio, { as: "contratoempenio", foreignKey: "id_cliente" });
    }
  };
  Cliente.init({
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El campo nombres solo puede contener letras"
        },
        len: {
          args: [2, 255],
          msg: "El campo nombres debe contener como minimo dos caracteres"
        }
      }
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El campo apellidos solo puede contener letras"
        },
        len: {
          args: [2, 255],
          msg: "El campo apellidos debe contener como minimo dos caracteres"
        }
      }
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: "El campo nacionalidad debe contener como minimo dos caracteres"
        }
      }
    },
    numero_cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        msg: 'Cedula ya registrada'
      },
      validate: {
        isNumeric: {
          msg: "Este campo solo puede contener números"
        },
        len: {
          args: [6, 10],
          msg: "Este campo debe contener como minimo seis digitos"
        }
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [12, 12],
          msg: "Este campo debe contener 11 digitos"
        }
      }
    },
    edo_civil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "El campo Correo debe ser válido"
        }
      },
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};