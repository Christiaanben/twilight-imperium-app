<template>
  <v-list>
    <v-list-item>
      You
      <v-select :items="['Lions', 'Bugs', 'Fish']" />
    </v-list-item>
    <v-list-item> - </v-list-item>
    <v-list-item> - </v-list-item>
    <v-list-item> - </v-list-item>
  </v-list>
  <v-switch label="Ready" v-model="isReady" />
</template>

<script lang="ts">
export default {
  name: 'LobbyView',
  data: () => ({
    isReady: false,
  }),
}
</script>

<style scoped></style>
