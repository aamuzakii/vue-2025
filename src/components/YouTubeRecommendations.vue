<script setup>
import { ref, onMounted, computed } from 'vue';

// Accept a keyword, default remains 'Dokter Mobil'
const props = defineProps({
  keyword: {
    type: String,
    default: 'Dokter Mobil',
  },
});

const isLoading = ref(true);
const apiPlaylists = ref([]); // array of playlist IDs
const error = ref('');

onMounted(async () => {
  try {
    const API_KEY = "AIzaSyCvaJfc_XzpcBp8oINEhMgfuuWhKkyRqGA";
    if (!API_KEY) {
      error.value = 'Missing VITE_YT_API_KEY. Please set it in your environment.';
      apiPlaylists.value = [];
      return;
    }

    const params = new URLSearchParams({
      part: 'snippet',
      q: props.keyword,
      type: 'playlist',
      maxResults: '6',
      key: API_KEY,
    });

    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
      error.value = `YouTube API error: ${res.status}`;
      apiPlaylists.value = [];
      return;
    }
    const data = await res.json();
    const playlists = (data.items || [])
      .map((it) => it?.id?.playlistId)
      .filter(Boolean);

    if (playlists.length === 0) {
      error.value = 'No playlists found for the given keyword.';
      apiPlaylists.value = [];
    } else {
      apiPlaylists.value = playlists;
    }
  } catch (e) {
    apiPlaylists.value = [];
    error.value = 'Error fetching playlists.';
  } finally {
    isLoading.value = false;
  }
});

const items = computed(() => {
  return apiPlaylists.value.map((id) => ({ type: 'playlist', id }));
});
</script>

<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Recommended for "{{ props.keyword }}"</h2>

    <div v-if="isLoading" class="text-gray-400 text-sm">Loading playlists...</div>
    <div v-else-if="error" class="text-red-600 text-sm">{{ error }}</div>

    <div v-else-if="items.length === 0" class="text-gray-500 text-sm">No playlists to display.</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(item, idx) in items"
        :key="idx + (item.id || '')"
        class="bg-white rounded-lg shadow border overflow-hidden"
      >
        <div class="aspect-video w-full">
          <iframe
            class="w-full h-full"
            :src="`https://www.youtube.com/embed/videoseries?list=${item.id}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
        <div class="p-3 text-sm text-gray-600">
          Playlist: {{ item.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-video {
  position: relative;
}
.aspect-video::before {
  content: '';
  display: block;
  padding-bottom: 56.25%;
}
.aspect-video > iframe {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
