<template>
  <v-app>
    <the-layout>
      <router-view />
    </the-layout>
  </v-app>
</template>

<script setup lang="ts">
import TheLayout from './components/layout/TheLayout.vue'
</script>

<style scoped></style>
