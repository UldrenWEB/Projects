import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { setStatus } from '@/states/useStatus';
import { setStatus as isLoading } from '@/states/useBoolean';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/LoginView.vue")
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/RegisterView.vue")
    },
    {
      path: '/',
      name: 'home',
      component: () => import("../views/HomeView.vue")
    },
    {
      path: '/',
      name: 'main',
      component: () => import("../views/MainView.vue"),
      children: [
        {
          path: 'reports',
          name: 'reports',
          component: () => import('../views/ReportsView.vue')
        },
        {
          path: 'bill',
          name: 'bill',
          component: () => import('../views/GenerateBillView.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  isLoading({ value: true })
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('token');

  if (loggedIn) {
    const decodedToken = jwtDecode(loggedIn) as { exp: number };
    const currentDate = new Date();
    // Si el token ha expirado
    if (decodedToken.exp < currentDate.getTime() / 1000) {

      setStatus({ code: 3, description: 'Token expired, please login again.' })
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      return next('/login');
    }
  }

  if (authRequired && !loggedIn) {
    setStatus({ code: 3, description: 'You need to login to access this page.' })
    return next('/login');
  }

  next();
})

router.afterEach((to, from) => {
  isLoading({ value: false })
})

export default router
