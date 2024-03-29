import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {showInNavBar: true, title: 'Redekasser', short:'Redekasser'},
      component: () => import('../components/home/home.vue')
    },
    {
      path: '/addRecord/:fid',
      name: 'addRecord',
      meta: {showInNavBar: false, title: 'Opret Registrering', short:''},
      component: () => import('../components/record/addRecord.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {showInNavBar: true, title: 'Login', short:'Login'}
    }
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title + ' - Fuglegruppen';
});
export default router