import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/JobsView.vue')
    },
    {
      path: '/properties',
      name: 'properties',
      component: () => import('@/views/JobsView.vue')
    },
    {
      path: '/properties/:id',
      name: 'property',
      component: () => import('@/views/JobView.vue')
    },
    {
      path: '/properties/add',
      name: 'add-property',
      component: () => import('@/views/AddJobView.vue')
    },
    {
      path: '/properties/edit/:id',
      name: 'edit-property',
      component: () => import('@/views/EditJobView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    },
  ],
  
  // Improve performance with scroll behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

export default router;
