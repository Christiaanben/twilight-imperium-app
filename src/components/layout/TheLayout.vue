<template>
  <the-navigation-drawer />
  <v-main>
    <slot />
  </v-main>
</template>

<script lang="ts">
import TheNavigationDrawer from '@/components/layout/TheNavigationDrawer.vue'

export default {
  name: 'TheLayout',
  components: { TheNavigationDrawer },
}
</script>

<style scoped></style>
