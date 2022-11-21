<template>
  <v-app>
    <the-layout>
      <router-view />
    </the-layout>
  </v-app>
</template>

<script setup lang="ts">
import TheLayout from './components/layout/TheLayout.vue'

console.log('environment:', import.meta.env.VITE_ENVIRONMENT)
</script>

<style scoped></style>
