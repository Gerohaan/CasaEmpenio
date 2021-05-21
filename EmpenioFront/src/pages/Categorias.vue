<template>
  <div class="q-pa-xl">
   

    <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Gestion de categorias</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>

            <ListaCategorias></ListaCategorias>

          </q-card-section>
    </q-card>


  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import ListaCategorias from 'src/components/ListaCategorias'

export default {
  components: { ListaCategorias },
  data () {
    return {
    }
}

}
</script>


