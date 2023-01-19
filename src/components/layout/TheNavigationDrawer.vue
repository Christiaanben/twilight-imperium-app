<template>
  <v-navigation-drawer width="120">
    <v-list-item to="/"><v-img src="/icon.jpg" width="48" /></v-list-item>
    <v-list-item to="/setup"> Setup</v-list-item>
    <v-list-item to="/board"> Board</v-list-item>
    <v-list-item
      href="https://images-cdn.fantasyflightgames.com/filer_public/f3/c6/f3c66512-8e19-4f30-a0d4-d7d75701fd37/ti-k0289_learn_to_playcompressed.pdf"
    >
      Learn
    </v-list-item>
    <v-list-item href="https://youtube.com"> Watch</v-list-item>
    <v-list-item href="https://discord.com/"> Social</v-list-item>
    <v-list-item>
      <v-btn color="primary" to="/sign_up"> Sign Up </v-btn>
    </v-list-item>
    <v-list-item>
      <v-btn color="primary" to="/sign_in"> Sign Up </v-btn>
    </v-list-item>
    <template v-slot:append>
      <v-list-item>English</v-list-item>
      <v-list-item>Dark UI</v-list-item>
      <v-list-item>Help</v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import SignInDialog from '../dialogs/SignInDialog.vue'
export default {
  name: 'TheNavigationDrawer',
  components: {SignInDialog},
}
</script>

<style scoped></style>
