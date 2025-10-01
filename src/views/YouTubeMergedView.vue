<script setup>
import YouTubeView from '@/views/YouTubeView.vue';
import YTPublicPlaylistView from '@/views/YTPublicPlaylistView.vue';
</script>

<template>
  <section class="bg-green-50 min-h-[calc(100vh-160px)]">
    <div class="container m-auto max-w-5xl py-6 px-4 sm:py-10 space-y-8">
      <!-- Simple YouTube client -->
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md border">
        <h1 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">YouTube: Player + Recommendations</h1>
        <p class="text-gray-500 mb-4 sm:mb-6">Paste a video URL/ID and switch topics for recommendations.</p>
        <YouTubeView />
      </div>

      <!-- Public playlist explorer -->
      <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md border">
        <h2 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">YouTube: Public Playlists</h2>
        <p class="text-gray-500 mb-4 sm:mb-6">Pick a playlist to browse and play videos inline.</p>
        <YTPublicPlaylistView />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* This wrapper view merely composes existing pages for a single UI experience */
</style>
