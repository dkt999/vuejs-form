import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import MessageView from '@/views/MessageView.vue'
import MessageLoginView from '@/views/MessageLoginView.vue'
import MessageRegisterView from '@/views/MessageRegisterView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      children: [
        {
          path: 'login',
          components: {MainViewWraper: MessageLoginView },
          props: { MainViewWraper: { viewMode: 'full' } }
        },
        {
          path: 'register',
          components: {MainViewWraper: MessageRegisterView },
          props: { MainViewWraper: { viewMode: 'full' } }
        },
        {
          path: 'message',
          components: {MainViewWraper: MessageView },
          meta: { requiresAuth: true } 
        }
      ]
    },
  ],
})
// Kiểm tra authentication trước khi vào route cần bảo vệ
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Kiểm tra token lưu trong localStorage
  if (to.path === "/") {
    next(token ? "/message" : "/login");
  } 
  else if (!token && (to.path !== "/login" && to.path !== "/register")) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
export default router
