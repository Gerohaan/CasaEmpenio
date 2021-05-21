<template>
  <div class="q-pa-md q-gutter-md">
    <q-dialog v-model="ModalModificarCliente" persistent transition-show="scale" transition-hide="scale" full-width>
      <q-card class="text-black" style="width: 100%">
        <form @submit.prevent="modificarCliente()">
        <q-toolbar>
          <q-avatar>
            <q-icon size="2em" name="groups"/>
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Modificar</span> cliente</q-toolbar-title>

          <q-btn flat round dense icon="close" @click="CerrarModalModificarClient()"/>
        </q-toolbar>

        <q-card-section class="row q-gutter-md items-center">
          
     
     
        <!--<p class="q-mt-md">q-gutter-md</p>-->
            <div class="q-gutter-md row justify-start">
            <q-select 
              outlined 
              v-model="clientSelect.nacionalidad" 
              :options="options" 
              label="Nacionalidad" 
              hint="V/E"
              />
             <q-input 
                outlined
                v-model="clientSelect.numero_cedula"
                label="Cedula"
                mask="########"
                
              />
             <q-input 
              outlined 
              v-model="clientSelect.nombres" 
              label="Nombres"
              
              />
             <q-input 
              outlined 
              v-model="clientSelect.apellidos" 
              label="Apellidos"
              
              />
              <q-input
                outlined
                v-model="clientSelect.telefono"
                label="Telefono"
                mask="####-#######"
                
              />
              <q-select 
                outlined 
                v-model="clientSelect.edo_civil" 
                :options="options2" 
                label="Estado Civil"
                />
             <q-input 
              outlined 
              type="email" 
               
              v-model="clientSelect.correo" 
              label="Correo."
              />
             <q-input 
              outlined 
              v-model="clientSelect.direccion" 
              label="Direccion"
              autogrow
              />
            </div>
     
      
    
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
        <q-btn label="Modificar" type="submit" color="indigo" />
        </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      nacionalidad: '',
      cedula: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      email: '',
      model: null,
      options: [
        'Venezolano(a)', 'Extranjero(a)'
      ],
      edo_civil: '',
      options2: [
        'SOLTERO(A)', 'CASADO(A)', 'DIVORCIADO(A)', 'VIUDO(A)'
      ],
      direccion: '' 
      }
  },
  props: {
    clientSelect: Object
  },
  computed: {
      ...mapState(['ModalModificarCliente','userToken'])
  },
  methods: {
    ...mapMutations(['modalUpdateCliente']),

    CerrarModalModificarClient(){
        this.modalUpdateCliente(false)
    },

    /// Metodo de modificar cliente
    async modificarCliente() {
        this.$q.loading.show()
        let cliente = {
          nombres: this.clientSelect.nombres,
          apellidos: this.clientSelect.apellidos,
          nacionalidad: this.clientSelect.nacionalidad,
          numero_cedula: this.clientSelect.numero_cedula,
          telefono: this.clientSelect.telefono,
          edo_civil: this.clientSelect.edo_civil,
          correo: this.clientSelect.correo,
          direccion: this.clientSelect.direccion,
          status: 'ACTIVO'
        }
        let id = this.clientSelect.id
        let API_URI_CLIENTS = 'http://localhost:3000/api/clientes/'+id
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        await axios.patch(API_URI_CLIENTS, cliente, config ).then(response => {
            this.$q.loading.hide()
            this.$emit('listarClientes')
            this.CerrarModalModificarClient()
            this.$q.notify({
              type: 'positive',
              message: `Cliente Modificado Exitosamente.`
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
    },
    ///////////

  }
}
</script>