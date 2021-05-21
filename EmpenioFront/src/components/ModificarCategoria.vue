<template>
  <div class="q-pa-md q-gutter-md">
    <q-dialog v-model="ModalModificarCategoria" persistent transition-show="scale" transition-hide="scale" full-width>
      <q-card class="text-black" style="width: 100%">
        <form @submit.prevent="modificarCliente()">
        <q-toolbar>
          <q-avatar>
            <q-icon size="2em" name="style"/>
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Modificar</span> categoria</q-toolbar-title>

          <q-btn flat round dense icon="close" @click="CerrarModalModificarCategory()"/>
        </q-toolbar>

        <q-card-section class="row q-gutter-md items-center">
          
     
     
        <!--<p class="q-mt-md">q-gutter-md</p>-->
            <div class="q-gutter-md row justify-start">
                <q-input 
                  outlined 
                  v-model="categorySelect.nombre" 
                  label="Nombre"
                  
                  />
                <q-input 
                  outlined 
                  v-model="categorySelect.descripcion" 
                  label="Descripcion"
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
      
      }
  },
  props: {
    categorySelect: Object
  },
  computed: {
      ...mapState(['ModalModificarCategoria','userToken'])
  },
  methods: {
    ...mapMutations(['modalUpdateCategory']),

    CerrarModalModificarCategory(){
        this.modalUpdateCategory(false)
    },

    /// Metodo de modificar categoria
    async modificarCliente() {
        this.$q.loading.show()
        let categoria = {
          nombre: this.categorySelect.nombre,
          descripcion: this.categorySelect.descripcion,
          status: 'ACTIVA'
        }
        let id = this.categorySelect.id
        let API_URI_CATEGORY = 'http://localhost:3000/api/categorias/'+id
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        await axios.patch(API_URI_CATEGORY, categoria, config ).then(response => {
            this.$q.loading.hide()
            this.$emit('listarCategorias')
            this.CerrarModalModificarCategory()
            this.$q.notify({
              type: 'positive',
              message: `Categoria Modificada Exitosamente.`
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