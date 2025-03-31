<script setup>
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/img/logo.png";
import avatarImage from "@/assets/img/avatar.webp";
import { ref, computed } from "vue";
import { NInput } from "naive-ui";
import { VIcon, VBtn, VAvatar } from "vuetify/components";

const search = ref("");

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-white border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-black text-2xl font-bold ml-2"
              >Vue Jobs</span
            >
          </RouterLink>
          <div class="md:ml-auto flex items-center space-x-2">
            <n-input 
              v-model:value="search" 
              placeholder="Search properties" 
              clearable
              style="width: 400px;"
            >
              <template #prefix>
                <i class="i-mdi-magnify text-gray-500"></i>
              </template>
            </n-input>

            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <v-btn icon variant="outlined" color="white" class="mr-2">
                  <v-icon class="text-black">mdi-cog</v-icon>
                </v-btn>
                <span class="text-black text-sm">Settings</span>
              </div>
              <div class="flex items-center">
                <v-btn icon variant="outlined" color="white" class="mr-2">
                  <v-icon class="text-black">mdi-plus</v-icon>
                </v-btn>
                <span class="text-black text-sm">New</span>
              </div>
            </div>
            <v-avatar
              size="36"
              class="ml-2"
            >
              <img 
                :src="avatarImage" 
                alt="User Avatar"
              />
            </v-avatar>
            <RouterLink
              to="/jobs/add"
              :class="[
                isActiveLink('/jobs/add')
                  ? 'bg-green-900'
                  : 'hover:bg-gray-900 hover:text-black',
                'text-black',
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
        <div class="flex flex-1 items-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <div class="">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-black',
                  'text-black',
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
                    : 'hover:bg-gray-900 hover:text-black',
                  'text-black',
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
                    : 'hover:bg-gray-900 hover:text-black',
                  'text-black',
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
/* Additional styling for Naive UI input if needed */
</style>
