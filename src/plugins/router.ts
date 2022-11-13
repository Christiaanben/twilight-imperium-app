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
      path: '/board',
      component: () => import('@/views/board/BoardView.vue'),
    },
  ],
})

export default router
