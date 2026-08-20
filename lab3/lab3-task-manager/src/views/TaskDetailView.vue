<script setup>
defineOptions({ name: 'TaskDetailView' })

import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const store = useTaskStore()

const task = store.getById(route.params.id)

function remove() {
  store.deleteTask(route.params.id)
  router.push('/')
}
</script>

<template>
  <div class="task-detail" v-if="task">
    <RouterLink to="/" class="back-link">← Назад до списку</RouterLink>

    <h1>{{ task.title }}</h1>
    <div class="tags">
      <span class="tag tag-category">{{ task.category }}</span>
      <span class="tag" :class="'tag-' + task.priority">{{ task.priority }} пріоритет</span>
      <span v-if="task.done" class="tag tag-done">Виконано</span>
    </div>

    <div class="fields-grid card">
      <div class="field">
        <span class="field-label">Статус</span>
        <span class="field-value">{{ task.done ? 'Виконано' : 'Активна' }}</span>
      </div>
      <div class="field">
        <span class="field-label">Категорія</span>
        <span class="field-value">{{ task.category }}</span>
      </div>
      <div class="field">
        <span class="field-label">Дата створення</span>
        <span class="field-value">{{ task.createdAt }}</span>
      </div>
      <div class="field">
        <span class="field-label">Дедлайн</span>
        <span class="field-value">{{ task.deadline || '—' }}</span>
      </div>
    </div>

    <div class="description card">
      <span class="field-label">Опис</span>
      <p>{{ task.description || 'Опис не вказано' }}</p>
    </div>

    <div class="actions">
      <RouterLink :to="`/tasks/${task.id}/edit`" class="btn btn-secondary">✎ Редагувати</RouterLink>
      <button class="btn btn-danger" @click="remove">✕ Видалити</button>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Задачу з таким ідентифікатором не знайдено.</p>
    <RouterLink to="/">← До списку задач</RouterLink>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tag-done {
  background: #1f3a2a;
  color: #7fd99a;
}

.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 12px;
  color: #71727d;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.field-value {
  font-size: 15px;
}

.description {
  margin-bottom: 20px;
}

.description p {
  margin: 8px 0 0;
  color: #cfcfd6;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 10px;
}

.not-found {
  color: #9a9ba5;
}
</style>
