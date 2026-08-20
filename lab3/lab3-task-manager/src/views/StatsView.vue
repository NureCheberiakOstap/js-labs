<script setup>
defineOptions({ name: 'StatsView' })

import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()

const total = computed(() => store.tasks.length)
const active = computed(() => store.activeTasks.length)
const done = computed(() => store.doneTasks.length)
const overdue = computed(() => store.overdueTasks.length)
const progress = computed(() =>
  total.value === 0 ? 0 : Math.round((done.value / total.value) * 100)
)
</script>

<template>
  <div class="stats-view">
    <div class="stat-cards">
      <div class="stat-card card">
        <span class="stat-value">{{ total }}</span>
        <span class="stat-label">Всього задач</span>
      </div>
      <div class="stat-card card">
        <span class="stat-value accent-blue">{{ active }}</span>
        <span class="stat-label">Активних</span>
      </div>
      <div class="stat-card card">
        <span class="stat-value accent-green">{{ done }}</span>
        <span class="stat-label">Виконано</span>
      </div>
      <div class="stat-card card">
        <span class="stat-value accent-red">{{ overdue }}</span>
        <span class="stat-label">Прострочено</span>
      </div>
    </div>

    <div class="progress-block card">
      <div class="progress-header">
        <span>Прогрес виконання</span>
        <span>{{ progress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div class="deadlines-block card">
      <h3>Найближчі дедлайни (наступні 3 дні)</h3>
      <p v-if="store.upcomingDeadlines.length === 0" class="empty">Найближчих дедлайнів немає</p>
      <ul v-else class="deadline-list">
        <li v-for="task in store.upcomingDeadlines" :key="task.id">
          <RouterLink :to="`/tasks/${task.id}`">{{ task.title }}</RouterLink>
          <span class="tag tag-category">{{ task.category }}</span>
          <span class="deadline">{{ task.deadline }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
}

.accent-blue {
  color: #7fb8e0;
}
.accent-green {
  color: #7fd99a;
}
.accent-red {
  color: #ff8a8a;
}

.stat-label {
  font-size: 12px;
  color: #9a9ba5;
}

.progress-block {
  margin-bottom: 20px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #cfcfd6;
  margin-bottom: 10px;
}

.progress-bar {
  height: 10px;
  border-radius: 999px;
  background: #2a2b33;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c5cff, #a78bfa);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.deadline-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.deadline-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #14151a;
  border-radius: 8px;
}

.deadline-list a {
  flex: 1;
  color: #e6e6ea;
  text-decoration: none;
}

.deadline-list a:hover {
  color: #a78bfa;
}

.deadline-list .deadline {
  font-size: 12px;
  color: #ff8a8a;
}

@media (max-width: 600px) {
  .stat-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
