import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/properties',
      name: 'properties',
      component: JobsView,
    },
    {
      path: '/properties/:id',
      name: 'job',
      component: JobView,
    },
    {
      path: '/properties/add',
      name: 'add-job',
      component: AddJobView,
    },
    {
      path: '/properties/edit/:id',
      name: 'edit-job',
      component: EditJobView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
