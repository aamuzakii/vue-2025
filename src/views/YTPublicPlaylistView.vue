<script setup>
import { ref, computed, watchEffect } from 'vue';

// Predefined public playlists users can pick
const playlistOptions = [
  {
    label: 'Bulugul Maram',
    id: 'PLyAUkAlOKmake_GcA8HSWMniGGD1trm9z',
  },
  {
    label: 'Silsilah',
    id: 'PLyAUkAlOKmakh1S6dSm46OkKoas2z1HqB',
  },
];
const selected = ref(playlistOptions[0].id);
const playlistId = ref('');
const isLoading = ref(false);
const error = ref('');
const items = ref([]); // { videoId, title, thumbnail }
const currentVideoId = ref('');

async function loadPlaylist() {
  error.value = '';
  items.value = [];
  currentVideoId.value = '';

  const id = selected.value;
  playlistId.value = id;
  if (!id) {
    error.value = 'Please select a valid YouTube playlist.';
    return;
  }

  const API_KEY = "AIzaSyCvaJfc_XzpcBp8oINEhMgfuuWhKkyRqGA";
  if (!API_KEY) {
    error.value = 'Missing VITE_YT_API_KEY. Please set it in your environment.';
    return;
  }

  isLoading.value = true;
  try {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      maxResults: '50',
      playlistId: id,
      key: "AIzaSyCvaJfc_XzpcBp8oINEhMgfuuWhKkyRqGA",
    });
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
      error.value = `YouTube API error: ${res.status}`;
      return;
    }
    const data = await res.json();
    items.value = (data.items || []).map((it) => {
      const vid = it?.contentDetails?.videoId || it?.snippet?.resourceId?.videoId || '';
      const title = it?.snippet?.title || '';
      const thumbs = it?.snippet?.thumbnails || {};
      const thumb = thumbs.medium?.url || thumbs.default?.url || '';
      return { videoId: vid, title, thumbnail: thumb };
    }).filter((x) => x.videoId);
    if (items.value.length > 0) {
      currentVideoId.value = items.value[0].videoId;
    }
  } catch (e) {
    error.value = 'Error fetching playlist.';
  } finally {
    isLoading.value = false;
  }
}

const embedSrc = computed(() => {
  return currentVideoId.value
    ? `https://www.youtube.com/embed/${currentVideoId.value}?autoplay=1`
    : '';
});

// Auto-load initially and whenever selection changes
loadPlaylist();
watchEffect(() => {
  // re-load when the selected id changes
  // avoid double load at startup by checking playlistId
  if (playlistId.value && selected.value === playlistId.value) return;
  loadPlaylist();
});
</script>

<template>
  <section class="bg-green-50 min-h-[calc(100vh-160px)]">
    <div class="container m-auto max-w-4xl py-6 px-4 sm:py-10">
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md border">
        <h1 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">YouTube Public Playlist</h1>
        <p class="text-gray-500 mb-4 sm:mb-6">Choose a public playlist to view its videos and play them inline.</p>

        <div class="flex flex-col gap-2 mb-4">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in playlistOptions"
              :key="opt.id"
              type="button"
              @click="selected = opt.id"
              class="px-3 py-2 rounded border text-sm"
              :class="selected === opt.id
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-white text-gray-700 hover:bg-green-50 border-gray-300'"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm mb-3">{{ error }}</div>

        <div v-if="currentVideoId" class="aspect-video w-full mb-4">
          <iframe
            class="w-full h-full rounded"
            :src="embedSrc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>

        <div v-if="isLoading" class="text-gray-400 text-sm">Loading playlist...</div>
        <div v-else-if="!isLoading && items.length === 0 && playlistId" class="text-gray-500 text-sm">
          No videos found, or this playlist may be private.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            v-for="v in items"
            :key="v.videoId"
            type="button"
            class="text-left bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow"
            @click="currentVideoId = v.videoId"
          >
            <div class="aspect-video w-full bg-gray-100">
              <img :src="v.thumbnail" :alt="v.title" class="w-full h-full object-cover" />
            </div>
            <div class="p-2 sm:p-3 text-xs sm:text-sm text-gray-800">
              {{ v.title }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aspect-video { position: relative; }
.aspect-video::before { content: ''; display: block; padding-bottom: 56.25%; }
.aspect-video > iframe, .aspect-video > img { position: absolute; top: 0; left: 0; }
</style>
