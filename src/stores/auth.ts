import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: 'token',
    user: {
      id: '1',
      name: 'Bennie',
    },
  }),
  persist: true,
})
