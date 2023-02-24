import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      name: 'signUp',
      path: '/sign_up',
      component: () => import('@/views/auth/SignUpView.vue'),
    },
    {
      name: 'signIn',
      path: '/sign_in',
      component: () => import('@/views/auth/SignInView.vue'),
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
