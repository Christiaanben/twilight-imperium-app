<template>
  <h1 >Twilight Imperium Sign In</h1>
  <h2>Please add the following details: </h2>
  <form>
    <label>Email:</label>
    <v-text-field v-model="email" @blur="vuelidate.email.$touch"></v-text-field>
    <div v-if="vuelidate.email.$error">Please add a valid email.</div><br>

    <label>Password:</label>
    <v-text-field v-model="password" @blur="vuelidate.password.$touch"></v-text-field>
    <div v-if="vuelidate.password.$error">Please add a valid password</div><br>


    <v-btn @click="signInAccount" > Submit</v-btn>
  </form>
</template>

<script>

import { defineComponent } from 'vue'
import {useAuthStore} from "@/stores/auth";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

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
        const response = await this.authStore.signIn(this.email, this.password)
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