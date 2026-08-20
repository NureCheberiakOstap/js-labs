<script setup>
defineOptions({ name: 'TaskFormView' })

import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const store = useTaskStore()

// Режим форми (створення чи редагування) визначається наявністю параметра id у маршруті
const isEdit = computed(() => !!route.params.id)
const existing = isEdit.value ? store.getById(route.params.id) : null

const title = ref(existing?.title || '')
const description = ref(existing?.description || '')
const category = ref(existing?.category || 'Робота')
const priority = ref(existing?.priority || 'Середній')
const deadline = ref(existing?.deadline || '')
const done = ref(existing?.done || false)

const errors = ref({})

function validate() {
  errors.value = {}

  if (!title.value.trim()) {
    errors.value.title = "Назва є обов'язковою"
  }

  // Дедлайн не може бути у минулому лише при створенні нової задачі
  if (!isEdit.value && deadline.value) {
    const today = new Date().toISOString().slice(0, 10)
    if (deadline.value < today) {
      errors.value.deadline = 'Дедлайн не може бути у минулому'
    }
  }

  return Object.keys(errors.value).length === 0
}

function save() {
  if (!validate()) return

  const payload = {
    title: title.value.trim(),
    description: description.value.trim(),
    category: category.value,
    priority: priority.value,
    deadline: deadline.value,
    done: done.value,
  }

  if (isEdit.value) {
    store.updateTask(route.params.id, payload)
    router.push(`/tasks/${route.params.id}`)
  } else {
    store.addTask(payload)
    router.push('/')
  }
}

function cancel() {
  router.back()
}
</script>

<template>
  <div class="task-form-view">
    <RouterLink :to="isEdit ? `/tasks/${route.params.id}` : '/'" class="back-link">
      ← Назад {{ isEdit ? 'до деталей' : 'до списку' }}
    </RouterLink>

    <h1>{{ isEdit ? 'Редагування задачі' : 'Нова задача' }}</h1>

    <form class="task-form card" @submit.prevent="save">
      <label>
        Назва задачі
        <input v-model="title" type="text" placeholder="Введіть назву задачі" />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </label>

      <label>
        Опис
        <textarea v-model="description" rows="4" placeholder="Опис задачі"></textarea>
      </label>

      <div class="form-row">
        <label>
          Категорія
          <select v-model="category">
            <option>Робота</option>
            <option>Навчання</option>
            <option>Особисте</option>
          </select>
        </label>

        <label>
          Пріоритет
          <select v-model="priority">
            <option>Низький</option>
            <option>Середній</option>
            <option>Високий</option>
          </select>
        </label>
      </div>

      <div class="form-row">
        <label>
          Дедлайн
          <input v-model="deadline" type="date" />
          <span v-if="errors.deadline" class="error">{{ errors.deadline }}</span>
        </label>

        <label class="checkbox-label" v-if="isEdit">
          Статус
          <span class="checkbox-row">
            <input v-model="done" type="checkbox" id="done-checkbox" />
            <label for="done-checkbox" class="checkbox-text">Позначити виконаною</label>
          </span>
        </label>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" @click="cancel">Скасувати</button>
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? 'Зберегти зміни' : 'Створити задачу' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-text {
  color: #e6e6ea;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}
</style>
