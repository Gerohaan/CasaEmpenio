<template>
  <div class="q-pa-lg q-gutter-lg">
    <q-dialog v-model="ModalCrearCategoria" persistent transition-show="scale" transition-hide="scale" full-width>
      <q-card class="text-black" style="width: 100%">
        <form @submit.prevent="crearCategoria()">
        <q-toolbar>
          <q-avatar>
            <q-icon size="2em" name="style"/>
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Crear</span> categoria</q-toolbar-title>

          <q-btn flat round dense icon="close" @click="CerrarModalCrearCategory()"/>
        </q-toolbar>
        <!--<q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>-->

        <q-card-section class="row q-gutter-lg items-center">
          
     
     <div>
        <!--<p class="q-mt-md">q-gutter-md</p>-->
            <div class="q-gutter-md row justify-start">
             <q-input 
              outlined 
              v-model="nombre" 
              label="Nombre"
              />
             <q-input 
              outlined 
              v-model="descripcion" 
              label="Descripcion"
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
      nombre: '',
      descripcion: ''
    }
  },
  computed: {
      ...mapState(['ModalCrearCategoria','userToken'])
  },
  methods: {
    ...mapMutations(['modalCreateCategory']),

    CerrarModalCrearCategory(){
        this.modalCreateCategory(false)
    },

    async crearCategoria() {
        this.$q.loading.show()
        let categoria = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          status: 'ACTIVA'
        }
        let API_URI_CATEGORY = 'http://localhost:3000/api/categorias/crear'
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        await axios.post(API_URI_CATEGORY,categoria, config ).then(response => {
            this.$q.loading.hide()
            //console.log(response.data)
            this.$emit('listarCategorias')
            this.CerrarModalCrearCategory()
            this.$q.notify({
              type: 'positive',
              message: `Categoria Creada Exitosamente.`
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


  }
}
</script>