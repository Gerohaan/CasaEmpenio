<template>
  <div class="q-pa-xl">
    

      <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Gestion de Articulos</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>

            <ListaArticulos></ListaArticulos>

          </q-card-section>
    </q-card>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import ListaArticulos from 'src/components/ListaArticulos'

export default {
  components: { ListaArticulos },
  data () {
    return {
     
    }
  }
}
</script>


