<template>
  <v-card style="background-color: gray" height="300" class="mx-auto rounded-lg" width="197">
    <v-img src="/img/cards/action-card-template.webp">
      <div class="pa-2">
        <v-card-title class="text-yellow text-uppercase py-4 px-2"> Sabotage </v-card-title>
        <v-card-text class="text-white text-body-2">
          When another player plays an action card other than "Sabotage":<br />Cancel that action card.
        </v-card-text>
        <v-card-text class="text-white">
          Unlenn smashed a clenched fist into the bulkhead, green eyes ablaze with rage.
        </v-card-text>
      </div>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TiCard',
  data: () => ({
    IMAGE_PATHS: {
      action: '/img/cards/action-card-template.webp',
    },
  }),
})
</script>

<style scoped></style>
