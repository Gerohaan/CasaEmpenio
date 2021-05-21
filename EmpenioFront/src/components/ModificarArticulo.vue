<template>
  <div class="q-pa-md q-gutter-md">
    <q-dialog v-model="ModalModificarArticulo" persistent transition-show="scale" transition-hide="scale" full-width>
      <q-card class="text-black" style="width: 100%">
        <form @submit.prevent="modificarArticulo()">
        <q-toolbar>
          <q-avatar>
            <q-icon size="2em" name="dynamic_feed"/>
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Modificar</span> articulo</q-toolbar-title>

          <q-btn flat round dense icon="close" @click="CerrarModalModificarArticle()"/>
        </q-toolbar>

        <q-card-section class="row q-gutter-md items-center">
          
     
     
        <p class="q-mt-md">{{ newSelecctionsCategory }}</p>
            <div class="q-gutter-md row justify-start">
            
               <q-input 
                outlined
                v-model="artSelect.nombre"
                label="Nombre" 
                autogrow
              />
             <q-select
              outlined
              v-model="newSelecctionsCategory"
              :options="listCategory"
              label="Categoria" 
              option-value="id"
              option-label="nombre"
              option-disable="inactive"
              emit-value
              map-options
              style="min-width: 150px; max-width: 200px"
            />
             <q-input 
              outlined 
              v-model="artSelect.descripcion" 
              label="Descripción"
              autogrow
              />
              <q-input
                outlined
                v-model="artSelect.precio"
                label="Precio ($)"
                mask="#.##"
                reverse-fill-mask
                
              />
              <q-input
                outlined
                v-model="artSelect.cantidad"
                label="Cantidad"
                mask="##########"
                
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
        'Venezolano', 'Extranjero'
      ],
      direccion: '',
      newSelecctionsCategory: null
      }
  },
  props: {
    artSelect: Object,
    listCategory: Array,
    categorySelecctionName: String,
    categorySelecctionId: Number
  },
  computed: {
      ...mapState(['ModalModificarArticulo','userToken']),

  },
  methods: {
    ...mapMutations(['modalUpdateArticle']),

    CerrarModalModificarArticle(){
        this.modalUpdateArticle(false)
    },

    /// Metodo de modificar cliente
    async modificarArticulo() {
        this.$q.loading.show()
        let idCategoryUpdate = null
        if(this.newSelecctionsCategory == null) 
        {
            idCategoryUpdate = this.categorySelecctionId
        } else {
            idCategoryUpdate = this.newSelecctionsCategory
        }
        let articulo = {
          nombre: this.artSelect.nombre,
          id_categoria: idCategoryUpdate,
          descripcion: this.artSelect.descripcion,
          precio: this.artSelect.precio,
          cantidad: this.artSelect.cantidad,
          status: 'ACTIVO'
        }
        let id = this.artSelect.id
        let API_URI_ARTICLES = 'http://localhost:3000/api/articulos/'+id
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        await axios.patch(API_URI_ARTICLES, articulo, config ).then(response => {
            this.$q.loading.hide()
            this.$emit('listarArticulos')
            this.CerrarModalModificarArticle()
            this.$q.notify({
              type: 'positive',
              message: `Articulo Modificado Exitosamente.`
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