<template>
  <div class="q-pa-xl">


    <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Gestion de clientes</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>

            <ListaClientes></ListaClientes>

          </q-card-section>
    </q-card>

   
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import ListaClientes from 'src/components/ListaClientes'

export default {
  components: { ListaClientes },
  data () {
    return {}
  },
   

  }
</script>


