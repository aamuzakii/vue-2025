import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue';
import YouTubeView from '@/views/YouTubeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: JobsView,
    },
    {
      path: '/properties',
      name: 'properties',
      component: JobsView,
    },
    {
      path: '/properties/:id',
      name: 'property',
      component: JobView,
    },
    {
      path: '/properties/add',
      name: 'add-property',
      component: AddJobView,
    },
    {
      path: '/properties/edit/:id',
      name: 'edit-property',
      component: EditJobView,
    },
    {
      path: '/youtube',
      name: 'youtube',
      component: YouTubeView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
