import { createRouter, createWebHistory } from 'vue-router'
import MessageView from '../views/MessageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MessageView,
    },
  ],
})

export default router
