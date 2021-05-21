<template>
  <div class="q-pa-xl">
    
     <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Gestion de contratos</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>

            <ListaContratos></ListaContratos>

          </q-card-section>
    </q-card>
    

  </div>
</template>

<script>
import ListaContratos from 'src/components/ListaContratos'
export default {
  name: 'Contratos',
  components: {
    ListaContratos
  },
  data () {
    return {
    }
  }
}
</script>


