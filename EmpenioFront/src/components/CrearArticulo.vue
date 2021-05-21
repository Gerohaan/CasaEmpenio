<template>
  <div class="q-pa-lg q-gutter-lg">
    <q-dialog v-model="ModalCrearArticulo" persistent transition-show="scale" transition-hide="scale" full-width>
      <q-card class="text-black" style="width: 100%">
        <form @submit.prevent="crearArticulo()">
        <q-toolbar>
          <q-avatar>
            <q-icon size="2em" name="dynamic_feed"/>
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Crear</span> articulo</q-toolbar-title>

          <q-btn flat round dense icon="close" @click="CerrarModalCrearArticle()"/>
        </q-toolbar>
        <!--<q-card-section>
          <div class="text-h6">{{ categorySelecction }}</div>
          <div class="text-h6">{{  }}</div>
        </q-card-section>-->

        <q-card-section class="row q-gutter-lg items-center">
          
     
     <div>
        <!--<p class="q-mt-md">q-gutter-md</p>-->
            <div class="q-gutter-md row justify-start">
                
             <q-input 
                outlined
                v-model="nombre"
                label="Nombre"
                autogrow
              />
             <q-select
              outlined
              v-model="categorySelecction"
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
              v-model="descripcion" 
              label="Descripción" 
              autogrow
              />
              <q-input
                outlined
                v-model="precio"
                label="Precio ($)"
                mask="#.##"
                reverse-fill-mask
                
              />
              <q-input
                outlined
                v-model="cantidad"
                label="Cantidad"
                mask="##########"
                
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
      idCategoria: '',
      descripcion: '',
      precio: '',
      cantidad: '',
      categorySelecction: null,
      categories: null,
      }
  },
  props: {
    listCategory: Array
  },
  created () {
  
  },
  computed: {
      ...mapState(['ModalCrearArticulo','userToken'])
  },
  methods: {
    ...mapMutations(['modalCreateArticle']),

    CerrarModalCrearArticle(){
        this.modalCreateArticle(false)
    },

    async crearArticulo() {
        this.$q.loading.show()
        let articulo = {
          nombre: this.nombre,
          id_categoria: this.categorySelecction,
          descripcion: this.descripcion,
          precio: this.precio,
          cantidad: this.cantidad,
          status: 'ACTIVO'
        }
        let API_URI_ARTICLES = 'http://localhost:3000/api/articulos/crear'
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        await axios.post(API_URI_ARTICLES, articulo, config ).then(response => {
            this.$q.loading.hide()
            //console.log(response.data)
            this.$emit('listarArticulos')
            this.CerrarModalCrearArticle()
            this.$q.notify({
              type: 'positive',
              message: `Articulo Creado Exitosamente.`
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