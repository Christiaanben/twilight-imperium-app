<template>
  <v-card
    class="d-flex justify-center align-center"
    density="comfortable"
    height="100%"
    image="/img/spacetortoise.webp"
    theme="dark"
  >
    <v-sheet class="pa-4 overflow-auto" position="fixed" width="40%" height="40%" rounded color="rgb(0, 0, 0, 0.8)">
      <h1 class="mt-6">Sign In</h1>
      <form data-cy="formSignIn">
        <v-text-field
          class="py-2"
          data-cy="textEmail"
          v-model="email"
          :rules="[rules.validEmail]"
          @blur="vuelidate.email.$touch"
          variant="filled"
          label="Email"
        ></v-text-field>
        <v-text-field
          class="py-2"
          data-cy="textPassword"
          v-model="password"
          :rules="[rules.validPassword]"
          @blur="vuelidate.password.$touch"
          variant="filled"
          label="Password"
        ></v-text-field>
        <v-btn data-cy="buttonSubmit" @click="signInAccount"> Submit</v-btn>
      </form>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default defineComponent({
  name: 'SignInView',
  setup() {
    const authStore = useAuthStore()
    return {
      authStore,
      vuelidate: useVuelidate(),
    }
  },
  data: () => ({
    email: '',
    password: '',
    rules: {
      validEmail: (value: any) => !!value || 'Please add a valid email.',
      validPassword: (value: any) => !!value || 'Please add a valid password.',
    },
  }),
  methods: {
    async signInAccount() {
      if (await this.vuelidate.$validate()) {
        //ToDo add loader.
        const registerSuccess = await this.authStore.signIn(this.email, this.password)
        let userSuccess = false
        if (registerSuccess) {
          userSuccess = await this.authStore.hydrateUser()
        }
        //ToDo disable loader
        if (registerSuccess && userSuccess) {
          this.$router.push({ path: '/' })
        } else {
          //ToDO Add error message and response
          console.log(this.authStore.error_message.message)
        }
      }
    },
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    }
  },
})
</script>

<style scoped></style>
