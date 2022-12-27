import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/setup',
      component: () => import('@/views/setup/SetupView.vue'),
    },
    {
      name: 'lobby',
      path: '/lobby/:id',
      component: () => import('@/views/lobby/LobbyView.vue'),
    },
    {
      name: 'game',
      path: '/board/:id',
      component: () => import('@/views/board/BoardView.vue'),
    },
  ],
})

export default router
