<template>
 <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24 text-white" style="width:450px;height:450px;">
          <q-card-section class="bg-deep-purple-9">
            <h4 class="text-h5 text-white q-my-md">Inversiones FENIXCASH, C.A</h4>
            <p class="text-h15 text-white q-my-md">RIF: J-40996328-4</p>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
             <q-avatar size="100px">
                <img src="https://resizer.iproimg.com/unsafe/1200x/https://assets.iprofesional.com/assets/jpg/2020/08/502156.jpg">
            </q-avatar>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form 
              class="q-px-sm q-pt-xl" 
              @submit.prevent="loginUp()" 
            >
              <q-input 
                square 
                clearable 
                v-model="emailLogin" 
                type="email" 
                label="Correo">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
              </q-input>
              <q-input 
                square 
                clearable 
                v-model="passwordLogin" 
                type="password" 
                label="Contraseña">
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
              </q-input>
              <q-card-section>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn unelevated size="md" color="deep-purple-9" type="submit" class="full-width text-white" label="Acceder"/>
              </q-card-actions>
            </q-form>
          </q-card-section>
          
        </q-card>
      </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Acceso',
  data () {
    return {
     emailLogin: '',
     passwordLogin: '',
    }
  },
  created () {
    
  },
  computed: {
    
  },
  methods: {
    ...mapActions(['fetchUserLogin']),

    loginUp() {
      let user = {
        email: this.emailLogin,
        password: this.passwordLogin
      }
      this.fetchUserLogin(user);
      this.emailLogin = ''
      this.passwordLogin = ''
      user = {} 
    }
        
  }
 
}
</script>
