<template>
  <h2>New Game</h2>
  <h3>Game Setup</h3>
  <div>
    <v-label>Game Name</v-label>
    <v-text-field />
  </div>
  <v-btn to="/lobby">Create Lobby</v-btn>
</template>

<script>
export default {
  name: 'SetupView',
}
</script>

<style scoped></style>
