<template>
  <v-card style="background-color: gray" height="300" class="mx-auto rounded-lg" width="201">
    <v-img :src="imageSrc">
      <div class="d-flex flex-column py-2 px-4">
        <div class="title px-2" :class="{ action: type === 'action' }" :style="[titleBackground]">
          {{ title }}
        </div>
        <div v-if="subtitle" class="text-white text-center text-uppercase">{{ subtitle }}</div>
        <div class="text-body-2 pl-3" :class="[['agenda', 'promissory'].includes(type) ? 'text-black' : 'text-white']">
          When another player plays an action card other than "Sabotage":<br />Cancel that action card.
        </div>
        <div v-if="flavor" class="text-white text-center align-self-end pa-2 font-weight-thin font-italic">
          {{ flavor }}
        </div>
      </div>
    </v-img>
  </v-card>
  ========================
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TiCard',
  props: {
    type: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    flavor: {
      type: String,
      default: '',
    },
  },
  data: () => ({}),
  computed: {
    imageSrc(): string {
      return (
        {
          action: '/img/cards/action-card-template.jfif',
          agenda: '/img/cards/agenda-card-template.jfif',
          promissory: '/img/cards/promissory-card-template.jfif',
          secret: '/img/cards/secret-card-template.jfif',
          stage1: '/img/cards/stage1-card-template.jfif',
          stage2: '/img/cards/stage2-card-template.jfif',
        }[this.type] || ''
      )
    },
    titleBackground(): string {
      const rgb =
        {
          action: 'rgb(255,255,0)',
          agenda: 'rgb(0, 153, 255)',
          promissory: 'rgb(80, 100, 80)',
          secret: 'rgb(255, 0, 38)',
          stage1: 'rgb(250, 166, 49)',
          stage2: 'rgb(38, 153, 255)',
        }[this.type] || 'rgb(255, 255, 255)'
      return `background: -webkit-linear-gradient(left, ${rgb}, rgb(255, 255, 255)); -webkit-background-clip: text;`
    },
  },
})
</script>

<style scoped>
.title {
  text-align: center;
  font-size: large;
  line-height: normal;
  text-transform: uppercase;
  background-clip: content-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.action {
  text-align: left !important;
  padding-top: 24px !important;
  padding-left: 16px !important;
}
</style>
