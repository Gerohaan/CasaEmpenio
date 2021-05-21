<template>
  <q-dialog v-model="popupContratoArticle" persistent transition-show="scale" transition-hide="scale" full-width>
    <div>
       <q-card>
         <q-card-section>
            <q-table
              title="Articulos"
              :data="data"
              :columns="columns"
              row-key="id"
              :filter="filter"
              no-data-label="No se han encontrado articulos" 
              :dense="$q.screen.lt.md"
            >
            <template v-slot:top-left>
              <q-icon size="2em" name="dynamic_feed"/>
            </template>
              <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:no-data="{ icon, filter }">
                <div class="full-width row flex-center text-accent q-gutter-sm">
                  <q-icon size="2em" name="sentiment_dissatisfied" />
                  <span>
                    No hay coincidencias con "{{ filter }}"
                  </span>
                  <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                </div>
              </template>

              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width />
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td auto-width>
                    <q-btn size="sm" color="cyan" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
                  </q-td>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                  <q-td colspan="100%">
                    <div class="q-pa-md q-gutter-sm">
                      <!--<q-btn push color="white" @click="showClient(props.row.id)" icon="search" text-color="indigo" label="Ver" />-->
                      <q-btn push color="white" @click="selectionArticle(props.row.id)" icon="fact_check" text-color="indigo" label="Agregar al contrato" />
                      <q-btn push color="white" @click="AbrirModalModificarArticle(props.row.id)" icon="drive_file_rename_outline" text-color="indigo" label="Modificar" />
                      <q-btn push color="white" @click="deleteArticle(props.row.id)" icon="delete_sweep" text-color="indigo" label="Eliminar" />
                    </div>
                  </q-td>
                </q-tr>
              </template>

            </q-table>

            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn fab icon="add" color="indigo" @click="AbrirModalCrearArticle()" />
            </q-page-sticky>

            <CrearArticulo 
              v-on:listarArticulos="getArticulos" 
              :listCategory="categoriesList">
            </CrearArticulo>
            <ModificarArticulo 
              v-on:listarArticulos="getArticulos" 
              :artSelect="selectArt" 
              :listCategory="categoriesList"
              :categorySelecctionName="categoryName"
              :categorySelecctionId="categoryId"
              >
            </ModificarArticulo>
         </q-card-section>
       </q-card>
    </div>
  </q-dialog>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import CrearArticulo from 'src/components/CrearArticulo'
import ModificarArticulo from 'src/components/ModificarArticulo'

export default {
    name: 'ListaArticulosContrato',
    components: { 
      CrearArticulo,
      ModificarArticulo 
      },
  data () {
    return {
      filter: '',
      columns: [
        {
          name: 'ID',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre'},
        { name: 'categoria', align: 'center', label: 'Categoria', field: row => row.categoria.nombre},
       // { name: 'descripcion', label: 'Descripcion', field: 'descripcion' },
        { name: 'precio', label: 'Precio', field: 'precio' },
       // { name: 'cantidad', label: 'Cantidad', field: 'cantidad' },
        { name: 'status', label: 'Status', field: 'status' }
      ],
      data: [],
      selectArt: {},
      categories: {},
      categoriesList: null,
      categoryName: null,
      categoryId: null
    }
  },
  created () {
    this.getArticulos()
    this.getCategorias()
  },
  computed: {
    ...mapState(['userToken', 'popupContratoArticle'])
  },
  methods: {

    ...mapMutations(['modalCreateArticle','modalUpdateArticle', 'articleContratSelection', 'popupContArt']),

    selectionArticle(id) {
      let filterArticulo = this.data.find( art => art.id === id )
      //console.log(filterArticulo)
      this.articleContratSelection(filterArticulo)
      this.popupContArt(false)
    },

    AbrirModalCrearArticle(){
        let categoriesList = this.categories.map( Cat => Cat )
        this.categoriesList = categoriesList
        this.modalCreateArticle(true)
    },

    AbrirModalModificarArticle(id){
        let filterArticulo = this.data.find( art => art.id === id )
        this.selectArt = filterArticulo
        this.categoryName = filterArticulo.categoria.nombre
        this.categoryId = filterArticulo.categoria.id
        let categoriesList = this.categories.map( Cat => Cat )
        this.categoriesList = categoriesList
        this.modalUpdateArticle(true)
    },

    showArticle(id) {
      alert(id)
    },

     deleteArticle(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: '¿Confirma que desea eliminar el articulo seleccionado?',
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.$q.loading.show()
        let API_URI_ARTICLES = 'http://localhost:3000/api/articulos/'+id
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        axios.delete(API_URI_ARTICLES, config ).then(response => {
            this.$q.loading.hide()
            this.$q.notify({
              type: 'positive',
              message: `Articulo eliminado.`
            })
            this.getArticulos()
        }).catch(err => {
            this.$q.loading.hide()
            this.$q.notify({
              type: 'negative',
              message: err.response.data.msg
            })
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

     async  getArticulos() {
      let API_URI_ARTICLES = 'http://localhost:3000/api/articulos'
      let config = {
          headers: { Authorization: `Bearer ${this.userToken}` }
        }
      await axios.get(API_URI_ARTICLES, config).then(response => {
          this.data =  response.data
          //console.log(this.data[1].categoria);
      }).catch(err => {
        console.log(err.response.data)
      })

    },

    async getCategorias() {
    let API_URI_CATEGORY = 'http://localhost:3000/api/categorias'
    let config = {
        headers: { Authorization: `Bearer ${this.userToken}` }
      }
    await axios.get(API_URI_CATEGORY, config).then(response => {
        this.categories =  response.data
        //console.log(this.categories);
    }).catch(err => {
      console.log(err.response.data)
    })

    },

  }
}
</script>