<template>
  <div class="q-pa-lg q-gutter-lg">
    <q-dialog v-model="ModalCrearCliente" persistent transition-show="scale" transition-hide="scale" full-width>
      <q-card class="text-black" style="width: 100%">
        <form @submit.prevent="crearCliente()">
        <q-toolbar>
          <q-avatar>
            <q-icon size="2em" name="groups"/>
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Crear</span> cliente</q-toolbar-title>

          <q-btn flat round dense icon="close" @click="CerrarModalCrearClient()"/>
        </q-toolbar>
        <!--<q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>-->

        <q-card-section class="row q-gutter-lg items-center">
          
     
     <div>
        <!--<p class="q-mt-md">q-gutter-md</p>-->
            <div class="q-gutter-md row justify-start">
            <q-select 
              outlined 
              v-model="nacionalidad" 
              :options="options" 
              label="Nacionalidad" 
              hint="V/E"
              />
             <q-input 
                outlined
                v-model="cedula"
                label="Cedula"
                mask="########"
                
              />
             <q-input 
              outlined 
              v-model="nombres" 
              label="Nombres"
              mask="AAAAAAAAAAAAAAAAAAAAAA"
              />
             <q-input 
              outlined 
              v-model="apellidos" 
              label="Apellidos"
              mask="AAAAAAAAAAAAAAAAAAAAAA"
              />
              <q-input
                outlined
                v-model="telefono"
                label="Telefono"
                mask="####-#######"
                
              />
              <q-select 
              outlined 
              v-model="edo_civil" 
              :options="options2" 
              label="Estado Civil"
              />
             <q-input 
              outlined 
              type="email" 
               
              v-model="email" 
              label="Correo."
              />
             <q-input 
              outlined 
              v-model="direccion" 
              label="Direccion"
              autogrow
              />
            </div>
     </div>
      
    
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Crear" type="submit" color="indigo" />
          <q-btn label="Limpiar" type="reset" color="indigo" flat class="q-ml-sm" />
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
  computed: {
      ...mapState(['ModalCrearCliente','userToken'])
  },
  methods: {
    ...mapMutations(['modalCreateCliente']),

    CerrarModalCrearClient(){
        this.modalCreateCliente(false)
    },

    async crearCliente() {
        this.$q.loading.show()
        let cliente = {
          nombres: this.nombres,
          apellidos: this.apellidos,
          nacionalidad: this.nacionalidad,
          numero_cedula: this.cedula,
          telefono: this.telefono,
          edo_civil: this.edo_civil,
          correo: this.email,
          direccion: this.direccion,
          status: 'ACTIVO'
        }
        let API_URI_CLIENTS = 'http://localhost:3000/api/clientes/crear'
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        await axios.post(API_URI_CLIENTS,cliente, config ).then(response => {
            this.$q.loading.hide()
            //console.log(response.data)
            this.$emit('listarClientes')
            this.CerrarModalCrearClient()
            this.$q.notify({
              type: 'positive',
              message: `Cliente Creado Exitosamente.`
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

    /// Formulario de crear cliente

    onSubmit () {
      this.$refs.name.validate()
      this.$refs.age.validate()

      if (this.$refs.name.hasError || this.$refs.age.hasError) {
        this.formHasError = true
      }
      else if (this.accept !== true) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null

      this.$refs.name.resetValidation()
      this.$refs.age.resetValidation()
    }

    ///////////

  }
}
</script>