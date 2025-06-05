<script setup lang="ts">
import Header from '~/components/Header.vue'

const photos = ref<string[]>([])

const fetchPhotos = async () => {
  try {
    const { urls } = await $fetch('/api/listPhotos')
    photos.value = urls
  } catch (err) {
    console.error('Failed to load photos', err)
  }
}

onMounted(fetchPhotos)
</script>

<template>
  <Header>Scans</Header>
  <div class="photo-grid" v-if="photos.length">
    <img v-for="url in photos" :key="url" :src="url" alt="scan" />
  </div>
  <p v-else>No scans found.</p>
</template>

<style lang="scss">
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}
.photo-grid img {
  width: 100%;
  border-radius: 8px;
}
</style>
