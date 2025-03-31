<script setup>
import { RouterLink } from 'vue-router';
import { reactive, defineProps, onMounted, ref, h } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import { 
  NDataTable, 
  NSpace, 
  NButton, 
  NTag 
} from 'naive-ui';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  properties: [],
  isLoading: true,
});

const columns = [
  {
    title: 'Address',
    key: 'address',
    width: 200,
  },
  {
    title: 'Listing Type',
    key: 'listing_type',
    width: 150,
    render(row) {
      return h(NTag, { 
        type: row.listing_type === 'Sale' ? 'success' : 'warning' 
      }, { default: () => row.listing_type })
    }
  },
  {
    title: 'Price',
    key: 'price',
    width: 150,
  },
  {
    title: 'Status',
    key: 'status',
    width: 150,
    render(row) {
      const statusColorMap = {
        'Available': 'success',
        'Pending': 'warning',
        'Sold': 'error'
      }
      return h(NTag, { 
        type: statusColorMap[row.status] || 'default' 
      }, { default: () => row.status })
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 150,
    render(row) {
      return h(NSpace, null, {
        default: () => [
          h(NButton, 
            { 
              size: 'small', 
              onClick: () => navigateToDetails(row.id) 
            }, 
            { default: () => 'View Details' }
          )
        ]
      })
    }
  }
];

const navigateToDetails = (id) => {
  window.location.href = `/properties/${encodeURIComponent(id)}`;
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/properties');
    state.properties = response.data;
  } catch (error) {
    console.error('Error fetching properties', error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Property Listings
      </h2>
      
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show property table when done loading -->
      <n-data-table
        v-else
        :columns="columns"
        :data="state.properties.slice(0, limit || state.properties.length)"
        :pagination="false"
        :bordered="false"
      />
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/properties"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >
      View All Properties
    </RouterLink>
  </section>
</template>

<style scoped>
/* Additional styling if needed */
</style>
