<script setup>
import { ref, computed } from 'vue'
import TaskList from './components/TaskList.vue'

// 5a. Список задач
const tasks = ref([
  { id: 1, text: 'Вивчити основи Vue 3', done: false },
  { id: 2, text: 'Виконати лабораторну роботу №1', done: false },
])

// 5b. Значення поля введення
const newTaskText = ref('')

// 5c. Поточний режим фільтрації: 'all' | 'active' | 'done'
const filterMode = ref('all')

// Лічильник для генерації унікальних id
let nextId = 3

// 7. Додавання нової задачі
function addTask() {
  const text = newTaskText.value.trim()
  if (!text) return // 7a. перевірка коректності введених даних

  tasks.value.push({
    id: nextId++,
    text,
    done: false,
  })

  newTaskText.value = '' // 7c. очищення поля введення
}

// 9. Зміна стану задачі (виконано / не виконано)
function toggleTask(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

// 10. Видалення задачі
function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

// 11. Фільтрація задач через computed
const filteredTasks = computed(() => {
  if (filterMode.value === 'active') {
    return tasks.value.filter(t => !t.done)
  }
  if (filterMode.value === 'done') {
    return tasks.value.filter(t => t.done)
  }
  return tasks.value
})

const remainingCount = computed(() => tasks.value.filter(t => !t.done).length)
</script>

<template>
  <div class="app">
    <h1>Список задач</h1>

    <!-- 6. Форма введення нової задачі -->
    <form class="add-form" @submit.prevent="addTask">
      <input
        v-model="newTaskText"
        type="text"
        placeholder="Введіть нову задачу..."
      />
      <button type="submit">Додати</button>
    </form>

    <!-- 11a. Перемикачі режиму фільтрації -->
    <div class="filters">
      <button
        :class="{ active: filterMode === 'all' }"
        @click="filterMode = 'all'"
      >Усі</button>
      <button
        :class="{ active: filterMode === 'active' }"
        @click="filterMode = 'active'"
      >Активні</button>
      <button
        :class="{ active: filterMode === 'done' }"
        @click="filterMode = 'done'"
      >Виконані</button>
    </div>

    <!-- 8. Відображення списку задач (винесено в окремий компонент) -->
    <TaskList
      :tasks="filteredTasks"
      @toggle-task="toggleTask"
      @remove-task="removeTask"
    />

    <p class="counter">Залишилось невиконаних: {{ remainingCount }}</p>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.add-form input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.add-form button {
  padding: 8px 14px;
  border: none;
  background: #42b883;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
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

.counter {
  text-align: center;
  color: #666;
  margin-top: 16px;
}
</style>
