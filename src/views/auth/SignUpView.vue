<template>
  <h1 >Twilight Imperium Sign Up</h1>
  <h2>Please add the following details: </h2>
  <form>
    <label>Display Name:</label>
    <v-text-field v-model="displayName" @blur="vuelidate.displayName.$touch"></v-text-field>
    <div v-if="vuelidate.displayName.$error">Please add a valid display name.</div><br>

    <label>Email:</label>
    <v-text-field v-model="email" @blur="vuelidate.email.$touch"></v-text-field>
    <div v-if="vuelidate.email.$error">Please add a valid email.</div><br>

    <label>Password:</label>
    <v-text-field v-model="password" @blur="vuelidate.password.$touch"></v-text-field>
    <div v-if="vuelidate.password.$error">Please add a valid password</div><br>


    <v-btn @click="registerAccount" > Submit</v-btn>
  </form>
</template>

<script>

import { defineComponent } from 'vue'
import {useAuthStore} from "@/stores/auth";
import { useVuelidate } from '@vuelidate/core'
import { required, email} from '@vuelidate/validators'

export default defineComponent({
  name: "SignUpView",
  setup() {
    const authStore = useAuthStore()
    return {
      authStore,
      vuelidate: useVuelidate()
    }
  },
  data: () => ({
    displayName: '',
    email: '',
    password: '',
  }),
  methods: {
    async registerAccount() {
      if (await this.vuelidate.$validate()){
        //ToDo add loader.
        const registerSuccess = await this.authStore.register(this.displayName, this.email, this.password)
        let userSuccess = false
        if(registerSuccess){
            userSuccess = await this.authStore.hydrateUser()
        }

        //ToDo disable loader
        if(registerSuccess && userSuccess){
          this.$router.push({ path: '/'})
        }
        else{
          //ToDO Add error message and response
        }
      }
    },
  },
  validations () {
    return {
      displayName: {required},
      email: {required, email,},
      password: {required,}
    }
  }
})
</script>

<style scoped>

</style>