<template>
  <v-navigation-drawer app v-model="drawer" class="pa-4" expand-on-hover image="/img/space.webp" permanent theme="dark">
    <v-list>
      <v-list-item prepend-icon="mdi-pencil" to="/setup">Create Lobby</v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" to="/board/123">Board</v-list-item>
      <v-list-item
        prepend-icon="mdi-school"
        href="https://images-cdn.fantasyflightgames.com/filer_public/f3/c6/f3c66512-8e19-4f30-a0d4-d7d75701fd37/ti-k0289_learn_to_playcompressed.pdf"
      >
        Learn
      </v-list-item>
      <v-list-item prepend-icon="mdi-television-classic" href="https://youtube.com"> Watch</v-list-item>
      <v-list-item prepend-icon="mdi-chat" href="https://discord.com/"> Social</v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider></v-divider>
      <v-list-item class="justify-center pt-3">
        <sign-in-dialog />
      </v-list-item>
      <v-list-item class="justify-center">English</v-list-item>
      <v-list-item class="justify-center">Help</v-list-item>
      <v-list-item class="justify-center"
        ><v-switch v-model="isDark" :label="isDark ? 'Light' : 'Dark'" color="primary"></v-switch
      ></v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import SignInDialog from '../dialogs/SignInDialog.vue'
export default {
  name: 'TheNavigationDrawer',
  data: () => ({
    isDark: false,
    drawer: true,
  }),
  components: { SignInDialog },
}
</script>

<style scoped></style>
