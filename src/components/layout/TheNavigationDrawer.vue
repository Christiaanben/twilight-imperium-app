<template>
  <v-navigation-drawer class="pa-4" rail-width="90" permanent expand-on-hover rail image="/img/space.webp" theme="dark">
    <v-list>
      <v-list-item prepend-icon="mdi-controller" to="/">Join Game</v-list-item>
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
      <div class="showOnHover hidden">
        <v-divider></v-divider>
        <v-list-item class="justify-center pt-3">
          <sign-in-dialog />
        </v-list-item>
        <v-list-item class="justify-center">English</v-list-item>
        <v-list-item class="justify-center">Help</v-list-item>
        <v-list-item class="justify-center"
          ><v-switch v-model="isLightMode" :label="isLightMode ? 'Light' : 'Dark'" color="primary"></v-switch
        ></v-list-item>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import SignInDialog from '../dialogs/SignInDialog.vue'
import { useTheme } from 'vuetify'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'TheNavigationDrawer',
  data: () => ({}),
  components: { SignInDialog },
  setup() {
    const theme = useTheme()
    return {
      theme,
    }
  },
  computed: {
    isLightMode: {
      get() {
        return this.theme.global.name.value == 'light'
      },
      set(value: boolean) {
        this.theme.global.name.value = value ? 'light' : 'dark'
      },
    },
  },
})
</script>

<style scoped>
.v-navigation-drawer--is-hovering .showOnHover {
  display: block !important;
}

.hidden {
  display: none;
}
</style>
