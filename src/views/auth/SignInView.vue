<template>
  <h1 >Twilight Imperium Sign In</h1>
  <h2>Please add the following details: </h2>
  <form data-cy="formSignIn">
    <label data-cy="labelEmail" >Email:</label>
    <v-text-field data-cy="textEmail" v-model="email" @blur="vuelidate.email.$touch"></v-text-field>
    <div v-if="vuelidate.email.$error">Please add a valid email.</div><br>

    <label data-cy="labelPassword" >Password:</label>
    <v-text-field data-cy="textPassword" v-model="password" @blur="vuelidate.password.$touch"></v-text-field>
    <div v-if="vuelidate.password.$error">Please add a valid password</div><br>


    <v-btn data-cy="buttonSubmit" @click="signInAccount" > Submit</v-btn>
  </form>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import {useAuthStore} from "../../stores/auth";
import { useVuelidate } from '@vuelidate/core'
import { required, email} from '@vuelidate/validators'

export default defineComponent({
  name: "SignInView",
  setup() {
    const authStore = useAuthStore()
    return {
      authStore,
      vuelidate: useVuelidate()
    }
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async signInAccount() {
      if (await this.vuelidate.$validate()){
        //ToDo add loader.
        const registerSuccess = await this.authStore.signIn(this.email, this.password)
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
          console.log(this.authStore.error_message.message)
        }
      }
    },
  },
  validations () {
    return {
      email: { required, email,},
      password: { required,}
    }
  }
})
</script>

<style scoped>

</style>
