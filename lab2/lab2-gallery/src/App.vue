<script setup>
import ImageGallery from './components/ImageGallery.vue'
</script>

<template>
  <div class="app">
    <h1>Галерея зображень (Picsum Photos)</h1>
    <ImageGallery />
  </div>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}
</style>
