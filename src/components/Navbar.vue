<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png';
import { ref } from 'vue';
import { 
  VTextField, 
  VIcon, 
  VBtn 
} from 'vuetify/components';

const search = ref('');

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >Vue Jobs</span
            >
          </RouterLink>
          <div class="md:ml-auto flex items-center space-x-2">
            <v-text-field
              v-model="search"
              variant="outlined"
              density="compact"
              placeholder="Search properties"
              prepend-inner-icon="mdi-magnify"
              class="bg-white rounded-md"
              hide-details
            ></v-text-field>
            <v-btn 
              icon 
              variant="outlined" 
              color="white"
              class="ml-2"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
            <RouterLink
              to="/jobs/add"
              :class="[
                isActiveLink('/jobs/add')
                  ? 'bg-green-900'
                  : 'hover:bg-gray-900 hover:text-white',
                'text-white',
                'px-3',
                'py-2',
                'rounded-md',
              ]"
              >Add Job</RouterLink
            >
          </div>
        </div>
      </div>
      <!-- bottom part -->
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <div class="">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Jobs</RouterLink
              >
              <RouterLink
                to="/jobs/add"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Add Job</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Ensure Vuetify text field blends with the design */
.v-text-field {
  max-width: 300px;
}
</style>
