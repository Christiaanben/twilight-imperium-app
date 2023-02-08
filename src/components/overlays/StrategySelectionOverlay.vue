<template>
  <v-overlay width="100vw">
    <template v-slot:activator="{ isActive, props }">
      <v-btn class="ma-2" v-bind="props">Strategy Cards</v-btn>
    </template>
    <v-row class="pa-2">
      <v-col cols="3" v-for="i in 8" class="py-6 d-flex flex-column px-2">
        <v-img :src="`/img/strategy/${i}.png`" width="25vw" height="40vh" />
        <v-btn class="my-2 mx-14" color="primary">Select</v-btn>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script lang="ts">
export default {
  name: 'StrategySelectionOverlay',
}
</script>

<style scoped></style>
