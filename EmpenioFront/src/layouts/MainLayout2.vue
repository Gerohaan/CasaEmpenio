<template>
  <q-layout view="hHh lpR fFf" style="background: linear-gradient(#FFFFFF, #b8dfe0);">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="bg-deep-purple-9">
        <q-btn dense flat round icon="menu" @click="drawer = !drawer"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://resizer.iproimg.com/unsafe/1200x/https://assets.iprofesional.com/assets/jpg/2020/08/502156.jpg">
          </q-avatar>
          Inversiones FENIXCASH, C.A
        </q-toolbar-title>

       <!--<p class="text-h15 text-white q-my-md">RIF: J-40996328-4</p>-->
       <q-btn flat color="white" icon="logout" label="Cerrar sesion" @click="cerrarSesion()" />
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 100px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple to="/tablero">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section>
                Tablero
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/clientes">
              <q-item-section avatar>
                <q-icon name="groups" />
              </q-item-section>

              <q-item-section>
                Clientes
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/categorias">
              <q-item-section avatar>
                <q-icon name="style" />
              </q-item-section>

              <q-item-section>
                Categorias
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/articulos">
              <q-item-section avatar>
                <q-icon name="dynamic_feed" />
              </q-item-section>

              <q-item-section>
                Articulos
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/contratos">
              <q-item-section avatar>
                <q-icon name="article" />
              </q-item-section>

              <q-item-section>
                Contratos
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 100px">
          <div class="absolute-bottom bg-transparent">
            <!--<q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>-->
            <div class="text-weight-bold">{{ this.$store.state.userName }}</div>
            <div>{{ this.$store.state.userEmail }}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      
      <transition name="fade">
        <router-view />
      </transition>
      
    </q-page-container>


  </q-layout>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  data () {
    return {
      left: false,
      right: false,
      drawer: false
    }
  },
  methods: {
    ...mapActions(['destroyUserLogin']),

    cerrarSesion() {
      this.destroyUserLogin()
    }
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}
 
.fade-enter-active {
  transition-delay: .25s;
}
 
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>