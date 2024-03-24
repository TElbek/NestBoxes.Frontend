import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: 'Redekasser', short:'Redekasser'},
      component: () => import('../components/home/home.vue')
    },
    {
      path: '/repair',
      name: 'repair',
      meta: {title: 'Reparation', short:'Reparation'},
      component: () => import('../components/repair/repair.vue')
    },
  ]
})

router.afterEach((to, from) => {
  document.title = to.meta.title + ' - Fuglegruppen';
});

export default router