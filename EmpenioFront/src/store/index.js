import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Notify } from 'quasar'


import  createPersistedState  from  'vuex-persistedstate'

const API_URI = 'http://localhost:3000/api/signin'
const API_URI_CLIENTS = 'http://localhost:3000/api/clientes'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    // Session

    userEmail: '',
    userName: '',
    userToken: '',
    loginStatus: false,

    // Clientes

    clientes: {},

    // Modal Para Crear Cliente

    ModalCrearCliente: false,

    // Modal Para Modificar Cliente

    ModalModificarCliente: false,

    // Modal Para Crear Categoria

    ModalCrearCategoria: false,

    // Modal Para Modificar Categoria

    ModalModificarCategoria: false,

    // Modal Para Crear Articulo

    ModalCrearArticulo: false,

    // Modal Para Modificar Articulo

    ModalModificarArticulo: false,

    // Modal Para Crear Contrato

    ModalCrearContrato: false,
    maximizedToggle: true,

    // Modal Para Modificar Contrato

    // Popup Contrato Cliente 

    popupContratoClient: false,

    // Cliente Contrato Seleccionado

    clientContratSelected: {},

    // Popup Contrato Articulo

    popupContratoArticle: false,

    // Articulo Contrato Seleccionado

    articleContratSelected: {}

  },
  getters: {
   
      // Sesion

      userEmail: state => {
          return state.userEmail
      },
      userName: state => {
          return state.userName
      },
      userToken: state => {
          return state.userToken
      },
      loginStatus: state => {
          return state.loginStatus
      },

      // Clientes

      clientes: state => {
          return state.clientes
      },

      // Modal Para Crear Cliente

      ModalCrearCliente: state => {
          return state.ModalCrearCliente
      },

       // Modal Para Modificar Cliente

      ModalModificarCliente: state => {
        return state.ModalModificarCliente
      },

      // Modal Para Crear Categoria

      ModalCrearCategoria: state => {
        return state.ModalCrearCategoria
    },

     // Modal Para Modificar Categoria

      ModalModificarCategoria: state => {
        return state.ModalModificarCategoria
      },

      // Modal Para Crear Articulo

      ModalCrearArticulo: state => {
        return state.ModalCrearArticulo
      },

      // Modal Para Modificar Articulo

      ModalModificarArticulo: state => {
        return state.ModalModificarArticulo
      },

      // Modal Para Crear Contrato

      ModalCrearContrato: state => {
        return state.ModalCrearContrato
      },
      maximizedToggle: state => {
        return state.maximizedToggle
      },

      // Modal Para Modificar Contrato

      // Popup Contrato Cliente

      popupContratoClient: state => { 
        return state.popupContratoClient
      },

      // CLiente Contrato Seleccionado

      clientContratSelected: state => {
        return state.clientContratSelected
      },

      // Popup Contrato Articulo

      popupContratoArticle: state => {
        return state.popupContratoArticle
      },

      // Articulo Contrato Seleccionado

      articleContratSelected: state => {
        return state.articleContratSelected
      }

  },
  
  actions: {

    // Sesion

    async fetchUserLogin({ commit }, user) {
        await axios.post(API_URI, user).then(response => {
          commit('setUserLogin', response.data)
          Notify.create({
            type: 'positive',
            message: 'Credenciales correctas!'
          })
          this.$router.push("/tablero");
        }).catch(error => {
          if(!error.response) {
            Notify.create({
              type: 'negative',
              message: 'No se detecta respuesta del servidor'
            })
          } else if(error.response.data.status == 401) {
            console.log(error.response.data.msg);
              Notify.create({
                type: 'negative',
                message: error.response.data.msg
              })
          } else {
            console.log(error.response.data);
              Notify.create({
                type: 'negative',
                message: error.response.data.msg
              })
          }
        })
        
    },

    destroyUserLogin({ commit }) {
      commit('exitUserLogin')
      this.$router.push("/")
    },

    // Clientes

    async  listClients({ commit }, clientes) {
      await axios.post(API_URI_CLIENTS, clientes).then(response => {
        commit('getClientes', response.data).catch(error => {
          if(!error.response) {
            Notify.create({
              type: 'negative',
              message: 'No se detecta respuesta del servidor'
            })
          } else if(error.response.data.status == 401) {
            console.log(error.response.data.msg);
              Notify.create({
                type: 'negative',
                message: error.response.data.msg
              })
          } else {
            console.log(error.response.data);
              Notify.create({
                type: 'negative',
                message: error.response.data.msg
              })
          }
        })
      })
    }


  },
  mutations: {

    // Sesion

    setUserLogin: (state, user) => {
      state.userToken = user.token
      state.userEmail = user.user.email
      state.userName = user.user.name
      state.loginStatus = true
    },

    exitUserLogin: (state) => {
      state.userToken = ''
      state.userEmail = ''
      state.userName = ''
      state.loginStatus = false
    },

    // Clientes 

    getClientes: (state, clientes) => {
        state.clientes = clientes
    },

    // Modal Crear Cliente

    modalCreateCliente: (state, payload) => {
        state.ModalCrearCliente = payload
    },

    // Modal Modificar Cliente

    modalUpdateCliente: (state, payload) => {
      state.ModalModificarCliente = payload
  },

    // Modal Crear Categoria

    modalCreateCategory: (state, payload) => {
      state.ModalCrearCategoria = payload
  },

    // Modal Modificar Categoria

    modalUpdateCategory: (state, payload) => {
      state.ModalModificarCategoria = payload
  },

    // Modal Crear Articulo

    modalCreateArticle: (state, payload) => {
      state.ModalCrearArticulo = payload
  },

    // Modal Modificar Articulo

    modalUpdateArticle: (state, payload) => {
      state.ModalModificarArticulo = payload
  },

    // Modal Contrato
    
    modalContrato: (state, payload) => {
      state.ModalCrearContrato = payload
    },

    // Popup Contrato Cliente

    popupContClient: (state, payload) => {
      state.popupContratoClient = payload
    },

    // Cliente Contrato Seleccion

    clientContratSelection: (state, payload) => {
      state.clientContratSelected = payload
    },

    // Popup Contrato Articulo

    popupContArt: (state, payload) => {
      state.popupContratoArticle = payload
    },

    // Articulo Contrato Seleccion

    articleContratSelection: (state, payload) => {
      state.articleContratSelected = payload
    }

  },
  
  

  // Persintent
  plugins: [createPersistedState()]
 
})