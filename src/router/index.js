import { createRouter, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: () => import('../views/Tutorial.vue')
    }, 
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameDemo.vue')
    },
    {
      path: '/game2',
      name: 'game2',
      component: () => import('../views/GameDemo2.vue')
    }
  ]
})

export default router
