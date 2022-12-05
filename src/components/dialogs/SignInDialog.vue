<template>
  <v-dialog width="600" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Sign In </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-label>TOKEN:</v-label>
        <v-text-field v-model="authStore.token" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'SignInDialog',
  setup() {
    const authStore = useAuthStore()
    return {
      authStore,
    }
  },
  data: () => ({
    dialog: false,
  }),
}
</script>

<style scoped></style>
