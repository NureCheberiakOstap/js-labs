<script setup>
import { ref, computed, onMounted } from 'vue'
import ImageCard from './ImageCard.vue'

// 3a-3e. Змінні стану
const images = ref([])          // масив зображень
const isLoading = ref(false)    // прапорець стану завантаження
const error = ref(null)         // повідомлення про помилку
const favorites = ref([])       // масив id обраних зображень
const searchQuery = ref('')     // рядок пошуку

// Режим відображення: 'all' | 'favorites'
const viewMode = ref('all')

// 4. Функція завантаження даних із API
async function loadImages() {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=20')

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`)
    }

    const data = await response.json()
    images.value = data
  } catch (err) {
    error.value = err.message || 'Не вдалося завантажити зображення'
  } finally {
    isLoading.value = false
  }
}

// 5. Виклик завантаження після монтування компонента
onMounted(() => {
  loadImages()
})

// 9b. Додавання / видалення з обраних
function toggleFavorite(id) {
  const index = favorites.value.indexOf(id)
  if (index === -1) {
    favorites.value.push(id)
  } else {
    favorites.value.splice(index, 1)
  }
}

function isFavorite(id) {
  return favorites.value.includes(id)
}

// 10a-10b. Фільтрація через computed: пошук за автором + режим відображення
const filteredImages = computed(() => {
  let result = images.value

  if (viewMode.value === 'favorites') {
    result = result.filter(img => favorites.value.includes(img.id))
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    result = result.filter(img => img.author.toLowerCase().includes(query))
  }

  return result
})
</script>

<template>
  <div class="gallery-wrap">
    <!-- Панель керування: пошук і перемикач режиму -->
    <div class="controls">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Пошук за автором..."
        class="search-input"
      />

      <div class="filters">
        <button
          :class="{ active: viewMode === 'all' }"
          @click="viewMode = 'all'"
        >Усі</button>
        <button
          :class="{ active: viewMode === 'favorites' }"
          @click="viewMode = 'favorites'"
        >Обрані ({{ favorites.length }})</button>
      </div>
    </div>

    <!-- 7. Стан завантаження -->
    <p v-if="isLoading" class="status">Завантаження...</p>

    <!-- 8. Відображення помилок -->
    <div v-else-if="error" class="status error">
      <p>Сталася помилка: {{ error }}</p>
      <button @click="loadImages">Спробувати ще раз</button>
    </div>

    <!-- 6. Сітка карток зображень -->
    <div v-else class="grid">
      <p v-if="filteredImages.length === 0" class="status">Нічого не знайдено</p>

      <ImageCard
        v-for="image in filteredImages"
        :key="image.id"
        :image="image"
        :is-favorite="isFavorite(image.id)"
        @toggle-favorite="toggleFavorite(image.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.filters {
  display: flex;
  gap: 8px;
}

.filters button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  border-radius: 6px;
  cursor: pointer;
}

.filters button.active {
  background: #42b883;
  color: #fff;
  border-color: #42b883;
}

.status {
  text-align: center;
  color: #666;
  padding: 30px 0;
}

.status.error {
  color: #e74c3c;
}

.status.error button {
  margin-top: 10px;
  padding: 6px 14px;
  border: none;
  background: #42b883;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
</style>
