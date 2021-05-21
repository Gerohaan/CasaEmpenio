<template>
  <div class="q-pa-lg q-gutter-lg">
     <q-dialog
      v-model="ModalCrearContrato"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="text-black" style="background: linear-gradient(#FFFFFF, #b8dfe0);">
        <q-bar class="bg-deep-purple-9 text-white">
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" @click="cerrarModalContrato()">
            <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Registro de Contrato de Empeño # {{ numeroContratoRef }}.</div>
        </q-card-section>
        <q-form @submit.prevent="crearContrato()">
          <q-card-section class="q-pt-none">
                <hr>
              <p><q-icon size="2em" name="groups"/><strong> Cliente </strong></p>
                  <div class="q-gutter-md row justify-start">
                    <q-input 
                        outlined               
                        label="Cedula"
                        v-model="datosCliente.numero_cedula"
                        mask="########"
                    >
                        <template v-slot:append>
                          <q-icon name="groups" @click="popupSelectClient()" class="cursor-pointer">
                          </q-icon>
                        </template>
                    </q-input>

                    <q-input 
                        outlined 
                        v-model="datosCliente.nombres"
                        label="Nombres"
                    />
                    <q-input 
                        outlined 
                        v-model="datosCliente.apellidos"
                        label="Apellidos"
                    />
                    <q-input
                        outlined
                        v-model="datosCliente.telefono"
                        label="Telefono"
                        mask="####-#######"  
                    />
                    <q-input 
                        outlined 
                        type="email" 
                        v-model="datosCliente.correo"
                        label="Correo."
                        style="width: 300px"
                    />
                    <q-input 
                        outlined 
                        v-model="datosCliente.direccion"
                        label="Direccion"
                        style="width: 500px"
                    />
                  </div>
                <br>
                <hr>
              <p><q-icon size="2em" name="dynamic_feed"/><strong> Articulo </strong></p>
                  <div class="q-gutter-md row justify-start">
                  <q-input 
                      outlined               
                      label="Articulo"
                      v-model="datosArticulo.nombre"
                  >
                      <template v-slot:append>
                        <q-icon name="dynamic_feed" @click="popupSelectArt()" class="cursor-pointer">
                        </q-icon>
                      </template>
                  </q-input>

                  <q-input 
                      outlined 
                      label="Descripcion"
                      v-model="datosArticulo.descripcion"
                      style="width: 700px"
                  />
                  <q-input 
                      outlined
                      label="Categoria"
                      v-model="datosArticulo.categoria"
                  />
                  <q-input
                      outlined 
                      label="Cantidad"
                      v-model="cantidadArticulo" 
                      mask="######"
                  />
                  <q-input
                      outlined
                      label="Origen de adquisición"
                      v-model="origenAdquisiciom"
                      style="width: 400px"   
                  />
                  </div>
                <br>
                <hr>
              <p><q-icon size="2em" name="article"/><strong> Sobre el Contrato </strong></p>
                  <div class="q-gutter-md row justify-start">
                  <q-input 
                      outlined               
                      label="% de interes"
                      v-model="this.porcentajeDeInteres"
                      readonly
                  />
                  <q-input 
                      outlined               
                      label="Numero de dias"
                      v-model="this.diasDeContratoInicial"
                      readonly
                  />
                  <q-input 
                      outlined 
                      label="Precio del articulo $"
                      v-model="precioArticulo"
                  />
                  <q-input 
                      outlined 
                      label="Intereses $"
                      v-model="intereses"
                      readonly  
                  />
                  <q-input
                      outlined
                      label="Total Cancelar $"
                      v-model="totalCancelarCI" 
                      readonly
                  />
                  <q-input 
                      outlined 
                      label="Oberservaciones"
                      style="width: 400px" 
                      v-model="observaciones"
                  />
                  </div>
                <br>
                <hr>
                <q-card-actions align="right">
                  <q-btn label="Crear Contrato" type="submit" color="indigo" />
                  <q-btn label="Limpiar" type="reset" color="indigo" flat class="q-ml-sm" />
                </q-card-actions>

              
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
    <ListaClientesContrato></ListaClientesContrato>
    <ListaArticulosContrato></ListaArticulosContrato>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import ListaClientesContrato from 'src/components/ListaClientesContrato'
import ListaArticulosContrato from 'src/components/ListaArticulosContrato'

export default {
  name: 'CrearContrato',
  components: {
    ListaClientesContrato,
    ListaArticulosContrato
  },
  props: {
    porcentajeDeInteres: Number,
    diasDeContratoInicial: Number,
    totalContrats: Number
  },
  data () {
    return {
      maximizedToggle: true,
      precioArticulo: null,
      observaciones: '',
      origenAdquisiciom: '',
      cantidadArticulo: null,
    }
  },
  created() {
   
  },
  mounted() {

  },
  computed: {
    ...mapState(['userToken','ModalCrearContrato', 'popupContratoClient', 'clientContratSelected', 'popupContratoArticle', 'articleContratSelected', 'articleContratSelected']),

    datosCliente() {
      let datos = {
        numero_cedula: (this.clientContratSelected.numero_cedula == undefined) ? '' : this.clientContratSelected.numero_cedula,
        nombres: (this.clientContratSelected.nombres == undefined) ? '' : this.clientContratSelected.nombres,
        apellidos: (this.clientContratSelected.apellidos == undefined) ? '' : this.clientContratSelected.apellidos,
        telefono: (this.clientContratSelected.telefono == undefined) ? '' : this.clientContratSelected.telefono,
        correo: (this.clientContratSelected.correo == undefined) ? '' : this.clientContratSelected.correo,
        direccion: (this.clientContratSelected.direccion == undefined) ? '' : this.clientContratSelected.direccion
      }
      return datos
    },

    datosArticulo() {
       let datos = {
          nombre: (this.articleContratSelected.nombre == undefined) ? '' : this.articleContratSelected.nombre,
          descripcion: (this.articleContratSelected.descripcion == undefined) ? '' : this.articleContratSelected.descripcion,
          categoria: (this.articleContratSelected.nombre == undefined) ? '' : this.articleContratSelected.categoria.nombre
        }  
      return datos
    },

    intereses() {
      let multip = this.precioArticulo*this.porcentajeDeInteres
      let porc = multip/100
        return porc
    },
    totalCancelarCI() {
      let suma = parseInt(this.precioArticulo)+parseInt(this.intereses)
        if (isNaN(suma)) {
          return 0
        } else {
          return suma
        }
    },

    numeroContratoRef() {
      let countContrat = this.totalContrats
      let countContratPlus = countContrat+1 
      let numContrat = 0
        if(countContratPlus <= 9) {
          return numContrat = '000'+countContratPlus
        } else if(countContratPlus < 100 && countContratPlus >= 10 ) {
          return numContrat = '00'+countContratPlus
        } else if (countContratPlus < 1000 && countContratPlus >= 100) {
          return numContrat = '0'+countContratPlus
        } else if (countContratPlus >= 1000 ) {
          return numContrat = countContratPlus
        }
    }

  },
  methods: {
    ...mapMutations(['modalContrato','popupContClient','popupContArt']),

    popupSelectClient() {
      this.popupContClient(true)
    },

    popupSelectArt() {
      this.popupContArt(true)
    },

    cerrarModalContrato() {
      this.modalContrato(false)
    },

   async crearContrato() {
      let newContrat = { 
        numero_contrato: this.numeroContratoRef,
        id_cliente: this.clientContratSelected.id,
        id_articulo: this.articleContratSelected.id,
        cantidad_articulo: this.cantidadArticulo,
        precio_venta: this.precioArticulo,
        gastos_costos: this.intereses,
        total_cancelar: this.totalCancelarCI,
        tipo_contrato: 'EMPEÑO',
        numero_dias: this.diasDeContratoInicial,
        condiciones_particulares: this.observaciones,
        origen_adquisicion: this.origenAdquisiciom,
        status: 'ACTIVO'
      }
      console.log(newContrat)
       let API_URI_CONTRATS = 'http://localhost:3000/api/contremp/crear'
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        await axios.post(API_URI_CONTRATS,newContrat, config ).then(response => {
            this.$q.loading.hide()
            //console.log(response.data)
            this.$emit('listarContratos')
            this.cerrarModalContrato()
            this.$q.notify({
              type: 'positive',
              message: `Contrato Creado Exitosamente.`
            })
            this.$router.push({
              name: "ContratoDetalle",
              params:{
                id: response.data.id,
              }
            })
        }).catch(err => {
          this.$q.loading.hide()
          let errorList = err.response.data.errors
          let errors_names = errorList.map((er) =>
              this.$q.notify({
                  type: 'negative',
                  message: er.message
              })
            )
        })
    }

  }
}
</script>