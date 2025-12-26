// createRouter：创建router的实例
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'Category/:id',
          component: Category
        },
      ]
    },
    {
      path: '/Login',
      component: Login
    },
  ],
})

export default router
