<template>
  <h1 >Twilight Imperium Sign Up</h1>
  <h2>Please add the following details: </h2>
  <form>
    <label>User name:</label>
    <v-text-field v-model="userName" @blur="vuelidate.userName.$touch"></v-text-field>
    <div v-if="vuelidate.userName.$error">Please add a user name.</div><br>

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
import { required, email, minLength, helpers } from '@vuelidate/validators'

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
    userName: '',
    email: '',
    password: '',
  }),
  methods: {
    async registerAccount() {
      if (await this.vuelidate.$validate()){
        const response = await this.authStore.register(this.userName, this.email, this.password)
      }
    },
  },
  validations () {
    return {
      userName: {},
      email: { required, email,},
      password: { required,}
    }
  }
})
</script>

<style scoped>

</style>