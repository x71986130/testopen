import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Homeview.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Reportview.vue')  // 绑定组件
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
