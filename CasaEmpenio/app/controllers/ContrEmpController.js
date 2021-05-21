const { ContratoEmpenio } = require('../models/index');
const { PropContratoEmpeño } = require('../models/index');
const { InformacionEmpresa } = require('../models/index');

module.exports = {

 // Listar

 async index(req, res) {

    let contrEmp = await ContratoEmpenio.findAll({
        include: ["cliente", "articulo"]
    });

    res.json(contrEmp)
},

// Show id

async show(req, res) {

  let contrEmp = await ContratoEmpenio.findByPk(req.params.id, {
        include: ["cliente", "articulo"]
    });

    if(!contrEmp) {
        res.status(404).json({ msg: "Contrato no encontrado" });
    } else {
        res.json(contrEmp);
    }

},

// Create

async create(req, res) {     

    let contrEmp = await ContratoEmpenio.create({

        numero_contrato: req.body.numero_contrato,
        id_cliente: req.body.id_cliente,
        id_articulo: req.body.id_articulo,
        cantidad_articulo: req.body.cantidad_articulo,
        precio_venta: req.body.precio_venta,
        gastos_costos: req.body.gastos_costos,
        total_cancelar: req.body.total_cancelar,
        tipo_contrato: req.body.tipo_contrato,
        numero_dias: req.body.numero_dias,
        condiciones_particulares: req.body.condiciones_particulares,
        origen_adquisicion: req.body.origen_adquisicion,
        status: req.body.status

    }).then(contrEmp => {
        res.json(contrEmp);
    }).catch(err => {
        res.status(500).json(err);
    })

},

// Update

async update(req, res) {

  let contrEmp = await ContratoEmpenio.findByPk(req.params.id);

  if(!contrEmp) {
      res.status(404).json({ msg: "Contrato no encontrado" });
  } else {
      
        contrEmp.numero_contrato = req.body.numero_contrato;
        contrEmp.id_cliente = req.body.id_cliente;
        contrEmp.id_articulo = req.body.id_articulo;
        contrEmp.cantidad_articulo = req.body.cantidad_articulo;
        contrEmp.precio_venta = req.body.precio_venta;
        contrEmp.gastos_costos = req.body.gastos_costos;
        contrEmp.total_cancelar = req.body.total_cancelar;
        contrEmp.tipo_contrato = req.body.tipo_contrato;
        contrEmp.condiciones_particulares = req.body.condiciones_particulares;
        contrEmp.status = req.body.status;

        contrEmp.save().then(contrEmp => {
            res.json(contrEmp)
        })
  }
},

// Delete 

async delete(req, res) {

  let contrEmp = await ContratoEmpenio.findByPk(req.params.id);

    if(!contrEmp) {
        res.status(404).json({ msg: "Contrato no encontrado" });
    } else {
        contrEmp.destroy().then(contrEmp => {
            res.json({ msg: "El Contrato ha sido eliminado" });
        })
    }

},

// Props Contrat

 async propsContrat(req, res) {
    let propsContr = await PropContratoEmpeño.findAll();

    res.json(propsContr)
    
},

// Info Empresa 

async getInfoEmp(req, res) {
    let infoEmpre = await InformacionEmpresa.findAll()

    if(!infoEmpre) {
        res.status(404).json({ msg: "No se encontro información" })
    } else {
        res.json(infoEmpre)
    }
}


}