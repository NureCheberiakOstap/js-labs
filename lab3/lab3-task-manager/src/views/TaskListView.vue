<script setup>
defineOptions({ name: 'TaskListView' })

import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()

const categoryFilter = ref('all')
const priorityFilter = ref('all')
const sortBy = ref('deadline')
const searchQuery = ref('')

const categories = ['Робота', 'Навчання', 'Особисте']
const priorities = ['Низький', 'Середній', 'Високий']

const today = new Date().toISOString().slice(0, 10)

// Фільтрація одночасно за категорією та пріоритетом, пошук за назвою, сортування
const filteredTasks = computed(() => {
  let result = store.tasks

  if (categoryFilter.value !== 'all') {
    result = result.filter((t) => t.category === categoryFilter.value)
  }
  if (priorityFilter.value !== 'all') {
    result = result.filter((t) => t.priority === priorityFilter.value)
  }

  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    result = result.filter((t) => t.title.toLowerCase().includes(q))
  }

  result = [...result]
  if (sortBy.value === 'deadline') {
    result.sort((a, b) => (a.deadline || '').localeCompare(b.deadline || ''))
  } else {
    const order = { Високий: 0, Середній: 1, Низький: 2 }
    result.sort((a, b) => order[a.priority] - order[b.priority])
  }

  return result
})

function isOverdue(task) {
  return !task.done && task.deadline && task.deadline < today
}
</script>

<template>
  <div class="task-list-view">
    <div class="toolbar">
      <select v-model="categoryFilter">
        <option value="all">Усі категорії</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>

      <select v-model="priorityFilter">
        <option value="all">Усі пріоритети</option>
        <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
      </select>

      <select v-model="sortBy">
        <option value="deadline">Сортування: дедлайн</option>
        <option value="priority">Сортування: пріоритет</option>
      </select>

      <input v-model="searchQuery" type="text" placeholder="Пошук за назвою..." class="search-input" />

      <RouterLink to="/tasks/new" class="btn btn-primary">+ Додати задачу</RouterLink>
    </div>

    <ul class="task-items">
      <li v-if="filteredTasks.length === 0" class="empty">Задач не знайдено</li>

      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-row"
        :class="{ done: task.done }"
      >
        <button
          class="status-dot"
          :class="{ checked: task.done }"
          @click="store.toggleDone(task.id)"
          :title="task.done ? 'Позначити невиконаною' : 'Позначити виконаною'"
        ></button>

        <div class="task-main">
          <div class="task-title-row">
            <span class="task-title">{{ task.title }}</span>
          </div>
          <div class="task-meta">
            <span class="tag tag-category">{{ task.category }}</span>
            <span class="tag" :class="'tag-' + task.priority">{{ task.priority }}</span>
            <span class="deadline" :class="{ overdue: isOverdue(task) }">
              {{ isOverdue(task) ? 'прострочено: до ' : 'до ' }}{{ task.deadline }}
            </span>
          </div>
        </div>

        <div class="task-actions">
          <RouterLink :to="`/tasks/${task.id}/edit`" title="Редагувати">✎</RouterLink>
          <RouterLink :to="`/tasks/${task.id}`" title="Деталі">👁</RouterLink>
          <button @click="store.deleteTask(task.id)" title="Видалити">✕</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.toolbar select {
  width: auto;
  min-width: 140px;
}

.search-input {
  flex: 1;
  min-width: 180px;
}

.task-items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-row {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #1b1c22;
  border: 1px solid #2a2b33;
  border-radius: 10px;
  padding: 14px 16px;
}

.status-dot {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 50%;
  border: 2px solid #5c5d68;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

.status-dot.checked {
  background: #7c5cff;
  border-color: #7c5cff;
}

.task-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-title-row {
  display: flex;
}

.task-title {
  font-size: 15px;
}

.task-row.done .task-title {
  text-decoration: line-through;
  color: #71727d;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.deadline {
  font-size: 12px;
  color: #9a9ba5;
}

.deadline.overdue {
  color: #ff8a8a;
  font-weight: 600;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions a,
.task-actions button {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #2a2b33;
  color: #cfcfd6;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.task-actions a:hover,
.task-actions button:hover {
  background: #34353f;
}
</style>
