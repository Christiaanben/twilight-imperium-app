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
          @blur="v$.email.$touch"
          variant="filled"
          label="Email"
          :error-messages="getError('email')"
        ></v-text-field>
        <v-text-field
          class="py-2"
          data-cy="textPassword"
          v-model="password"
          @blur="v$.password.$touch"
          :error-messages="getError('password')"
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
import { required, email, minLength } from '@vuelidate/validators'

export default defineComponent({
  name: 'SignInView',
  setup() {
    const authStore = useAuthStore()
    return {
      authStore,
      v$: useVuelidate(),
    }
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    getError(field: string): string[] {
      return this.v$[field].$errors.map((error: any) => error.$message)
    },
    async signInAccount() {
      if (await this.v$.$validate()) {
        //ToDo add loader.
        const signInSuccess = await this.authStore.signIn(this.email, this.password)
        let userSuccess = false
        if (signInSuccess) {
          userSuccess = await this.authStore.hydrateUser()
        }
        //ToDo disable loader
        if (signInSuccess && userSuccess) {
          this.$router.push({ path: '/' })
        } else {
          if(this.authStore.error_message.status == 'email'){
              this.email = ''
          }
          this.password = ''
        }
      }
    },
  },
  validations() {
    return {
      email: {
        required,
        email: {
          $validator: email.$validator,
          $message: 'Please add a valid email.',
        },
      },
      password: {
        required: {
          $validator: required.$validator,
          $message: 'Please add a valid password.',
        },
        minLength: minLength(4),
      },
    }
  },
})
</script>

<style scoped></style>
