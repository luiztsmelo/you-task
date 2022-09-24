import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: () => import('../views/tasks/index.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (!store.state.auth.isAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

export default router
