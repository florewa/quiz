import {createRouter, createWebHistory} from 'vue-router'

const HomeView = () => import('@/pages/HomeView.vue')
const QuizView = () => import('@/pages/QuizView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/quiz',
            name: 'quiz',
            component: QuizView,
        }
    ],
})
router.beforeEach((to, from, next) => {
    next()
})
export default router
