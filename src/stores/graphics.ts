import { defineStore } from 'pinia'
import { Application } from 'pixi.js'

export const useGraphicsStore = defineStore('graphics', {
  state: () => ({
    app: new Application({
      height: 990,
      width: 1920,
      backgroundColor: '0x080810',
    }),
  }),
  actions: {},
})
