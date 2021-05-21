const express = require('express');
const router = express.Router();


// Middlewares
const auth = require('./middlewares/auth');


// Controllers
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const ClientesController = require('./controllers/ClientesController');
const CategoryController = require('./controllers/CategoryController');
const ArticulosController = require('./controllers/ArticulosController');
const ContrEmpController = require('./controllers/ContrEmpController');

// Home
router.get('/', (req, res) => res.json({ hello: 'World' }));

// Dos rutas: Login y registro
// /api/singin and /api/singoup
router.post('/api/signin', AuthController.signIn);
router.post('/api/singoup', AuthController.signUp);

// Rutas Posts
router.get('/api/posts', auth, PostController.index);
router.get('/api/posts/:id', auth, PostController.show);
router.patch('/api/posts/:id', auth, PostController.update);
router.delete('/api/posts/:id', auth, PostController.delete);

// Rutas Clientes 
router.get('/api/clientes', auth, ClientesController.index);
router.post('/api/clientes/crear', auth, ClientesController.create);
router.get('/api/clientes/:id', auth, ClientesController.show);
router.patch('/api/clientes/:id', auth, ClientesController.update);
router.delete('/api/clientes/:id', auth, ClientesController.delete);

// Rutas Categorias
router.get('/api/categorias', auth, CategoryController.index);
router.post('/api/categorias/crear', auth, CategoryController.create);
router.get('/api/categorias/:id', auth, CategoryController.show);
router.patch('/api/categorias/:id', auth, CategoryController.update);
router.delete('/api/categorias/:id', auth, CategoryController.delete);

// Rutas Articulos
router.get('/api/articulos', auth, ArticulosController.index);
router.post('/api/articulos/crear', auth, ArticulosController.create);
router.get('/api/articulos/:id', auth, ArticulosController.show);
router.patch('/api/articulos/:id', auth, ArticulosController.update);
router.delete('/api/articulos/:id', auth, ArticulosController.delete);

// Rutas Contratos Empeño
router.get('/api/contremp', auth, ContrEmpController.index);
router.post('/api/contremp/crear', auth, ContrEmpController.create);
router.get('/api/contremp/:id', auth, ContrEmpController.show);
router.patch('/api/contremp/:id', auth, ContrEmpController.update);
router.delete('/api/contremp/:id', auth, ContrEmpController.delete);
router.get('/api/propsContrat/', auth, ContrEmpController.propsContrat);
router.get('/api/getInfoEmp/', auth, ContrEmpController.getInfoEmp);

module.exports = router;