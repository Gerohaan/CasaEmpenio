const { Articulo } = require('../models/index');
const { Categoria } = require('../models/index');

module.exports = {

 // Listar

 async index(req, res) {

    let articu = await Articulo.findAll({
        include: [
            {
                association: "categoria"
            }
        ]
    });

    res.json(articu)
},

// Show id

async show(req, res) {

  let articu = await Articulo.findByPk(req.params.id, {
    include: [
        {
            association: "categoria"
        }
    ]
});

    if(!articu) {
        res.status(404).json({ msg: "Articulo no encontrado" });
    } else {
        res.json(articu);
    }

},

// Create

async create(req, res) {

    let articu = await Articulo.create({

        nombre: req.body.nombre,
        id_categoria: req.body.id_categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        status: req.body.status

    }).then(articu => {
        res.json(articu);
    }).catch(err => {
        res.status(500).json(err);
    })

},

// Update

async update(req, res) {

  let articu = await Articulo.findByPk(req.params.id);

  if(!articu) {
      res.status(404).json({ msg: "Articulo no encontrado" });
  } else {
      
        articu.nombre = req.body.nombre;
        articu.id_categoria = req.body.id_categoria;
        articu.descripcion = req.body.descripcion;
        articu.precio = req.body.precio;
        articu.cantidad = req.body.cantidad;
        articu.status = req.body.status;

        articu.save().then(articu => {
            res.json(articu)
        })
  }
},

// Delete 

async delete(req, res) {

  let articu = await Articulo.findByPk(req.params.id);

    if(!articu) {
        res.status(404).json({ msg: "Articulo no encontrado" });
    } else {
        articu.destroy().then(articu => {
            res.json({ msg: "El Articulo ha sido eliminado" });
        })
    }

}



}