<template>
    <div>

    <q-table
      title="Clientes"
      :data="data"
      :columns="columns"
      row-key="id"
      :filter="filter"
      no-data-label="No se han encontrado clientes" 
      :dense="$q.screen.lt.md"
    >
    <template v-slot:top-left>
      <q-icon size="2em" name="groups"/>
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
              <q-btn push color="white" @click="AbrirModalModificarClient(props.row.id)" icon="drive_file_rename_outline" text-color="indigo" label="Modificar" />
              <q-btn push color="white" @click="deleteClient(props.row.id)" icon="delete_sweep" text-color="indigo" label="Eliminar" />
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="indigo" @click="AbrirModalCrearClient()" />
    </q-page-sticky>

     <CrearCliente v-on:listarClientes="getClientes"></CrearCliente>
     <ModificarCliente v-on:listarClientes="getClientes" :clientSelect="selectClient"></ModificarCliente>
    
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import CrearCliente from 'src/components/CrearCliente'
import ModificarCliente from 'src/components/ModificarCliente'

export default {
    name: 'ListaClientes',
    components: { 
      CrearCliente,
      ModificarCliente 
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
        { name: 'nombres', align: 'center', label: 'Nombres', field: 'nombres'},
        { name: 'apellidos', align: 'center', label: 'Apellidos', field: 'apellidos'},
        { name: 'nacionalidad', label: 'Nacionalidad', field: 'nacionalidad' },
        { name: 'numero_cedula', label: 'Numero Cedula', field: 'numero_cedula' },
        { name: 'telefono', label: 'Telefono', field: 'telefono' },
        { name: 'correo', label: 'Correo', field: 'correo' },
        { name: 'direccion', label: 'Direccion', field: 'direccion' },
        { name: 'status', label: 'Status', field: 'status' }
      ],
      data: [],
      selectClient: {}
      
    }
  },
  created () {
    this.getClientes()
  },
  computed: {
    ...mapState(['userToken'])
  },
  methods: {

    ...mapMutations(['modalCreateCliente','modalUpdateCliente']),

    AbrirModalCrearClient(){
        this.modalCreateCliente(true)
    },

    AbrirModalModificarClient(id){
        let filterCliente = this.data.find( client => client.id === id )
        this.selectClient = filterCliente
        this.modalUpdateCliente(true)
    },

    showClient(id) {
      alert(id)
    },

     deleteClient(id) {
      this.$q.dialog({
        title: 'Confirm',
        message: '¿Confirma que desea eliminar el cliente seleccionado?',
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
        let API_URI_CLIENTS = 'http://localhost:3000/api/clientes/'+id
        let config = {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        axios.delete(API_URI_CLIENTS, config ).then(response => {
            this.$q.loading.hide()
            this.$q.notify({
              type: 'positive',
              message: `Cliente eliminado.`
            })
            this.getClientes()
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

     async  getClientes() {
      let API_URI_CLIENTS = 'http://localhost:3000/api/clientes'
      let config = {
          headers: { Authorization: `Bearer ${this.userToken}` }
        }
      await axios.get(API_URI_CLIENTS, config).then(response => {
          this.data =  response.data
          //console.log(this.data);
      }).catch(err => {
        console.log(err.response.data)
      })

    }

  }
}
</script>