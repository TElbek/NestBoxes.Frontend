import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthenticateStore } from '@/stores/authenticate.js';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { showInNavBar: true, title: 'Redekasser', requiresAuth: true },
      component: () => import('../components/home/nestboxOverview.vue')
    },
    {
      path: '/repair',
      name: 'repair',
      meta: { showInNavBar: true, title: 'Reparation', requiresAuth: true },
      component: () => import('../components/repair/repairOverview.vue')
    },
    {
      path: '/repair/edit/:id',
      name: 'repairEdit',
      meta: { showInNavBar: false, title: 'Rediger Reparation', requiresAuth: true },
      component: () => import('../components/repair/repairEdit.vue')
    },
    {
      path: '/repair/add',
      name: 'repairAdd',
      meta: { showInNavBar: false, title: 'Tilføj Reparation', requiresAuth: true },
      component: () => import('../components/repair/repairEdit.vue')
    },
    {
      path: '/addRecord/:fid',
      name: 'addRecord',
      meta: { showInNavBar: false, title:'',  requiresAuth: true },
      component: () => import('../components/record/addRecord.vue')
    },
    {
      path: '/export',
      name: 'export',
      meta: { showInNavBar: false, title: 'Eksport',  requiresAuth: true },
      children: [
        {
          path: '/export/records',
          name: 'exportrecords',
          meta: { showInNavBar: true, title: 'Redekasse Status',  requiresAuth: true },
          component: () => import('../components/export/exportrecords.vue')
        },
        {
          path: '/export/checkme',
          name: 'exportcheckme',
          meta: { showInNavBar: true, title: 'Udestående Redekassetjek',  requiresAuth: true },
          component: () => import('../components/export/exportchecklists.vue')
        },        
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { showInNavBar: false, title: 'Login',  requiresAuth: false },
      component: () => import('../components/main/login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      meta: { showInNavBar: true, title: 'Log ud',  requiresAuth: true },
      component: () => import('../components/main/logout.vue')
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