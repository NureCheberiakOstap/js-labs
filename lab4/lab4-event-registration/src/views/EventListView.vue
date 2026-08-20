<script setup>
defineOptions({ name: 'EventListView' })

import { RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents'

const { events } = useEvents()
</script>

<template>
  <div class="event-list">
    <div class="event-grid">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div class="event-banner" :style="{ background: event.gradient }">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
        </div>

        <div class="event-body">
          <span class="tag">{{ event.category }}</span>
          <h2>{{ event.title }}</h2>
          <time>{{ event.date }}</time>
          <p class="desc">{{ event.description }}</p>

          <div class="event-actions">
            <RouterLink :to="`/events/${event.id}`" class="btn btn-secondary">Деталі</RouterLink>
            <RouterLink :to="`/events/${event.id}/register`" class="btn btn-primary">Реєстрація</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.event-card {
  background: #16171c;
  border: 1px solid #22232a;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.event-banner {
  padding: 20px;
  color: #fff;
  min-height: 90px;
}

.event-banner h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.event-banner p {
  margin: 0;
  font-size: 12px;
  opacity: 0.9;
}

.event-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-body time {
  font-size: 12px;
  color: #a3a4ad;
}

.desc {
  font-size: 13px;
  color: #c8c9d1;
  margin: 4px 0 10px;
}

.event-actions {
  display: flex;
  gap: 8px;
}
</style>
