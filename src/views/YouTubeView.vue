<script setup>
import { ref, computed } from 'vue';

const input = ref('');
const autoplay = ref(true);

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
    <div class="container m-auto max-w-3xl py-10 px-4">
      <div class="bg-white p-6 rounded-lg shadow-md border">
        <h1 class="text-2xl font-bold mb-4">YouTube</h1>
        <p class="text-gray-500 mb-6">Paste a YouTube URL or Video ID, then click Play.</p>

        <div class="flex gap-2 mb-4">
          <input
            v-model="input"
            type="text"
            placeholder="e.g. https://youtu.be/dQw4w9WgXcQ or dQw4w9WgXcQ"
            class="flex-1 border rounded px-3 py-2"
          />
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
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
