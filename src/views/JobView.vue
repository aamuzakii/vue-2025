<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { 
  NCard, 
  NSpace, 
  NButton, 
  NTag, 
  NDivider, 
  NText,
  NPopconfirm,
} from 'naive-ui';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.id;

const state = reactive({
  job: {},
  isLoading: true,
});

const deleteJob = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this properties?');
    if (confirm) {
      await axios.delete(`/api/properties/${jobId}`);
      toast.success('Job Deleted Successfully');
      router.push('/properties');
    }
  } catch (error) {
    console.error('Error deleting properties', error);
    toast.error('Job Not Deleted');
  }
};

onMounted(async () => {
  try {
    // Update the URL to fetch directly from the public folder
    const response = await axios.get(`/properties.json`);
    
    // Assuming you're filtering the properties based on jobId
    const property = response.data.find(item => item.id === jobId);
    
    if (property) {
      state.properties = property;
    } else {
      console.log('Property not found');
    }
  } catch (error) {
    console.error('Error fetching properties', error);
  } finally {
    state.isLoading = false;
  }
});

</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ state.properties.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.properties.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ state.properties.address }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ state.properties.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.properties.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="space-y-4">
          <!-- Contact Information -->
          <n-card 
            title="Contact Information" 
            size="small" 
            embedded 
            :bordered="true"
          >
            <n-space vertical>
              <n-space align="center">
                <n-tag type="info" size="small">Company Description</n-tag>
                <n-text depth="3">
                  <!-- {{ state.properties.company.description }} -->
                </n-text>
              </n-space>

              <n-divider />

              <n-space vertical>
                <n-space align="center">
                  <n-tag type="success" size="small">Contact Email</n-tag>
                  <n-space align="center">
                    <!-- <n-icon :component="EmailOutline" /> -->
                    <n-text strong>aamuzakii@gmail.com</n-text>
                  </n-space>
                </n-space>

                <n-space align="center">
                  <n-tag type="success" size="small">Contact Phone</n-tag>
                  <n-space align="center">
                    <!-- <n-icon :component="CallOutline" /> -->
                    <n-text strong>+ 62 838 9458 8105</n-text>
                  </n-space>
                </n-space>
              </n-space>
            </n-space>
          </n-card>

          <!-- Manage Job -->
          <n-card 
            title="Manage Job" 
            size="small" 
            embedded 
            :bordered="true"
          >
            <n-space vertical>
              <RouterLink :to="`/jobs/edit/${state.properties.id}`">
                <n-button 
                  type="default" 
                  ghost
                  block
                >
                  Edit Job
                </n-button>
              </RouterLink>

              <n-popconfirm 
                @positive-click="deleteJob"
                positive-text="Delete"
                negative-text="Cancel"
                positive-button-type="error"
              >
                <template #trigger>
                  <n-button 
                    type="error" 
                    ghost
                    block
                  >
                    Delete Job
                  </n-button>
                </template>
                Are you sure you want to delete this job?
              </n-popconfirm>
            </n-space>
          </n-card>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>
