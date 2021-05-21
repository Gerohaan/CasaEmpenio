<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#FFFFFF, #b8dfe0);"
  >

    <Acceso></Acceso>
  
  </q-page>
</template>

<script>
import Acceso from 'src/components/Acceso.vue';
export default {
  components: { Acceso },
  name: 'PageIndex',
  data () {
    return {
     
    }
  }
}
</script>

<style>
</style>
