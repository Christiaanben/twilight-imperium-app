<template>
  <v-card
    class="d-flex justify-center align-center"
    density="comfortable"
    height="100%"
    image="/img/spacecats.webp"
    theme="dark"
  >
    <v-sheet class="pa-4 overflow-auto" position="fixed" width="40%" height="50%" rounded color="rgb(0, 0, 0, 0.8)">
      <h1 class="mt-4">Sign Up</h1>
      <form data-cy="formSignUp">
        <v-text-field
          class="py-2"
          data-cy="textFieldDisplayName"
          v-model="displayName"
          @blur="v$.displayName.$touch"
          variant="filled"
          label="Display Name"
          :error-messages="getError('displayName')"
        ></v-text-field>
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
          variant="filled"
          label="Password"
          :error-messages="getError('password')"
        ></v-text-field>
        <v-btn class="mt-4" data-cy="buttonSubmit" @click="registerAccount"> Submit</v-btn>
      </form>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useVuelidate } from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'

export default defineComponent({
  name: 'SignUpView',
  setup() {
    const authStore = useAuthStore()
    authStore.clearErrors()
    return {
      authStore,
      v$: useVuelidate(),
    }
  },
  data: () => ({
    displayName: '',
    email: '',
    password: '',
  }),
  methods: {

    getError(field: string): string[] {
        if( field === this.authStore.error_message.status){
            return [this.authStore.error_message.message]
        }
        return this.v$[field].$errors.map((error: any) => error.$message)
    },

    async registerAccount() {
      if (await this.v$.$validate()) {
        this.authStore.clearErrors()
        const registerSuccess = await this.authStore.register(this.displayName, this.email, this.password)
        let userSuccess = false
        if (registerSuccess) {
          userSuccess = await this.authStore.hydrateUser()
        }

        if (registerSuccess && userSuccess) {
          this.$router.push({ path: '/' })
        } else {
          this.password = ""
        }
      }
    },
  },
  validations() {
    return {
      displayName: {
          required: {
              $validator: required.$validator,
              $message: 'Please enter a display name.'
          },
          minLength: minLength(4),
      },
      email: {
          required: {
              $validator: required.$validator,
              $message: 'Please enter an email.',
          },
          email: {
              $validator: email.$validator,
              $message: 'Please enter a valid email.',
          },
      },
      password: {
          required: {
              $validator: required.$validator,
              $message: 'Please enter a password.',
          },
          minLength: minLength(4),
      },
    }
  },
})
</script>

<style scoped></style>
