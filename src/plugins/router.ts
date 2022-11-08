import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/board',
            component: () => import('@/views/BoardView.vue'),
        }
    ]
})

export default router
