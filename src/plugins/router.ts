import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/components/HelloWorld.vue'),
        },
        {
            path: '/board',
            component: () => import('@/views/board/BoardView.vue'),
        }
    ]
})

export default router
