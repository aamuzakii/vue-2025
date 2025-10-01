<script setup>
import { ref, computed } from 'vue';
import YouTubeRecommendations from '@/components/YouTubeRecommendations.vue';

const input = ref('');
const autoplay = ref(true);

// Keyword selector for recommendations
const keywordOptions = ['dokter mobil', 'ustadz firanda', 'fasa netral'];
const selectedKeyword = ref(keywordOptions[0]);

// Extract YouTube video ID from a URL or pass-through an ID
const videoId = computed(() => {
  const raw = input.value.trim();
  if (!raw) return '';

  // If it's already a simple 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  try {
    const url = new URL(raw);
    // youtu.be/<id>
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace('/', '').split('/')[0];
      return id || '';
    }
    // youtube.com/watch?v=<id>
    if (url.searchParams.has('v')) {
      return url.searchParams.get('v') || '';
    }
    // youtube.com/embed/<id>
    const parts = url.pathname.split('/').filter(Boolean);
    const embedIndex = parts.findIndex((p) => p === 'embed');
    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      return parts[embedIndex + 1];
    }
  } catch (e) {
    // Not a URL, fall through
  }

  return '';
});

const showPlayer = ref(false);

const play = () => {
  showPlayer.value = !!videoId.value;
};
</script>

<template>
  <section class="bg-green-50 min-h-[calc(100vh-160px)]">
    <div class="container m-auto max-w-3xl py-6 px-4 sm:py-10">
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md border">
        <h1 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">YouTube</h1>
        <p class="text-gray-500 mb-4 sm:mb-6">Paste a YouTube URL or Video ID, then click Play.</p>

        <div class="flex flex-col gap-2 mb-4">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in keywordOptions"
              :key="opt"
              type="button"
              @click="selectedKeyword = opt"
              class="px-3 py-2 rounded border text-sm capitalize"
              :class="selectedKeyword === opt
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-white text-gray-700 hover:bg-green-50 border-gray-300'"
            >
              {{ opt }}
            </button>
          </div>
          <input
            v-model="input"
            type="text"
            placeholder="e.g. https://youtu.be/dQw4w9WgXcQ or dQw4w9WgXcQ"
            class="w-full sm:flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            class="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            @click="play"
          >
            Play
          </button>
        </div>

        <div v-if="showPlayer && videoId" class="aspect-video w-full">
          <iframe
            class="w-full h-full rounded"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>

        <div v-else class="text-gray-400 text-sm">No video loaded.</div>

        <YouTubeRecommendations class="mt-6 sm:mt-8" :keyword="selectedKeyword" />
      </div>
    </div>
  </section>
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
