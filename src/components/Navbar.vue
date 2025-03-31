<script setup>
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/img/logo.png";
import avatarImage from "@/assets/img/avatar.webp";
import { ref } from "vue";
import { 
  NInput, 
  NIcon, 
  NDropdown,
  NSpace,
  NButton
} from "naive-ui";
import { VIcon, VBtn, VAvatar } from "vuetify/components";

const route = useRoute();

const homeOptions = [
  {
    label: 'Contacts',
    key: 'dashboard',
    disabled: false
  },
  {
    label: 'Task',
    key: 'analytics',
    disabled: false
  },
  {
    label: 'Calendar',
    key: 'analytics',
    disabled: false
  }
];

const jobsOptions = [
  {
    label: 'Properties',
    key: 'job-list',
    disabled: false
  },
  {
    label: 'Appraisals',
    key: 'create-job',
    disabled: false
  },
  {
    label: 'Listings',
    key: 'job-categories',
    disabled: false
  }
];

const addJobOptions = [
  {
    label: 'Email Campaign',
    key: 'quick-add',
    disabled: false
  },
  {
    label: 'SMS Campaign',
    key: 'detailed-add',
    disabled: false
  }
];

const search = ref("");

const handleHomeSelect = (key) => {
  console.log('Home dropdown selected:', key);
  // Add navigation logic here
};

const handleJobsSelect = (key) => {
  console.log('Jobs dropdown selected:', key);
  // Add navigation logic here
};

const handleAddJobSelect = (key) => {
  console.log('Add Property dropdown selected:', key);
  // Add navigation logic here
};

const isActiveLink = (routePath) => {
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
            <img class="h-10 w-auto" :src="logo" alt="Vue Property" />
            <span class="hidden md:block text-black text-2xl font-bold ml-2"
              >Vue Property</span
            >
          </RouterLink>
          <div class="md:ml-auto flex items-center space-x-2">
            <n-input 
              v-model:value="search" 
              placeholder="Search properties" 
              clearable
              style="width: 400px;"
            >
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
          </div>
        </div>
      </div>
      <!-- bottom part -->
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <div class="">
            <n-space>
              <n-dropdown 
                :options="homeOptions" 
                @select="handleHomeSelect"
                trigger="hover"
              >
                <n-button>CRM</n-button>
              </n-dropdown>

              <n-dropdown 
                :options="jobsOptions" 
                @select="handleJobsSelect"
                trigger="hover"
              >
                <n-button>Properties</n-button>
              </n-dropdown>

              <n-dropdown 
                :options="addJobOptions"
                @select="handleAddJobSelect"
                trigger="hover"
              >
                <n-button>Marketing</n-button>
              </n-dropdown>
            </n-space>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Additional styling for Naive UI components if needed */
</style>
