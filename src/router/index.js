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
      path: '/editBox/:boxId',
      name: 'editBox',
      meta: {showInNavBar: false, title: 'Rediger Redekasse', short:''},
      component: () => import('../components/nestbox/editBox.vue')
    },
    {
      path: '/repair',
      name: 'repair',
      meta: {showInNavBar: true, title: 'Reparation', short:'Reparation'},
      component: () => import('../components/repair/repair.vue')
    },
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title + ' - Fuglegruppen';
});
export default router