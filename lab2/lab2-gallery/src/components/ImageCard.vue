<script setup>
defineProps({
  image: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <div class="card">
    <img
      :src="image.download_url"
      :alt="image.author"
      loading="lazy"
    />
    <div class="card-footer">
      <span class="author">{{ image.author }}</span>
      <button
        class="fav-btn"
        :class="{ active: isFavorite }"
        @click="emit('toggle-favorite')"
      >
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
}

.author {
  font-size: 14px;
  color: #333;
}

.fav-btn {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #ccc;
}

.fav-btn.active {
  color: #f5a623;
}
</style>
