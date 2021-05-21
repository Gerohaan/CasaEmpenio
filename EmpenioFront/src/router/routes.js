
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/tablero',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/Tablero.vue'), meta: { requiresAuth: true } }
    ]
  },

  {
    path: '/clientes',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/Clientes.vue'), meta: { requiresAuth: true } }
    ]
  },

  {
    path: '/categorias',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/Categorias.vue'), meta: { requiresAuth: true } }
    ]
  },

  {
    path: '/articulos',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/Articulos.vue'), meta: { requiresAuth: true } }
    ]
  },

  {
    path: '/contratos',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('pages/Contratos.vue'), meta: { requiresAuth: true } }
    ]
  },

  {
    path: '/contratos/detalle/:id',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', component: () => import('components/ContratoDetalle.vue'), name: 'ContratoDetalle', meta: { requiresAuth: true } }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]


export default routes
