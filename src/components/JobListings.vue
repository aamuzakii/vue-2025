<script setup>
import { RouterLink } from 'vue-router';
import { reactive, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

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

const headers = [
  { title: 'Address', key: 'address' },
  { title: 'Listing Type', key: 'listing_type' },
  { title: 'Price', key: 'price' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
];

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
      <v-data-table
        v-else
        :headers="headers"
        :items="state.properties.slice(0, limit || state.properties.length)"
        item-key="address"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <RouterLink 
            :to="`/properties/${encodeURIComponent(item.address)}`" 
            class="text-blue-500 hover:underline"
          >
            View Details
          </RouterLink>
        </template>
      </v-data-table>
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
