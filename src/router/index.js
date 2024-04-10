import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthenticateStore } from '@/stores/authenticate.js';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { showInNavBar: true, title: 'Redekasser', short: 'Redekasser', requiresAuth: false },
      component: () => import('../components/home/nestboxOverview.vue')
    },
    {
      path: '/addRecord/:fid',
      name: 'addRecord',
      meta: { showInNavBar: false, title: 'Opret Registrering', short: '', requiresAuth: true },
      component: () => import('../components/record/addRecord.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { showInNavBar: false, title: 'Login', short: 'Login', requiresAuth: false },
      component: () => import('../components/main/login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' - Fuglegruppen';
  const authenticate = useAuthenticateStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    let authenticated = authenticate.isLoggedIn;
    if (!authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
        next();
    }
  } else {
    next();
  }
});

export default router