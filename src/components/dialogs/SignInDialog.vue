<template>
  <v-dialog width="600" v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Sign In </v-btn>
    </template>
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'SignInDialog',
  data: () => ({
    dialog: false,
  }),
}
</script>

<style scoped></style>
