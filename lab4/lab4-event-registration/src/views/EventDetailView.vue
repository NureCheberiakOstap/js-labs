<script setup>
defineOptions({ name: 'EventDetailView' })

import { useRoute, RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistrations } from '../composables/useRegistrations'

const route = useRoute()
const { getEventById } = useEvents()
const event = getEventById(route.params.id)

const { getRegistrations } = useRegistrations()
const registrations = event ? getRegistrations(event.id) : null
</script>

<template>
  <div v-if="event" class="event-detail">
    <RouterLink to="/" class="back-link">← Назад</RouterLink>

    <div class="detail-grid">
      <div class="event-banner large" :style="{ background: event.gradient }">
        <h2>{{ event.title }}</h2>
        <p>{{ event.description }}</p>
      </div>

      <div class="detail-info">
        <h1>{{ event.title }}</h1>
        <time>{{ event.date }}</time>
        <p>{{ event.description }}</p>
        <RouterLink :to="`/events/${event.id}/register`" class="btn btn-primary">
          Зареєструватися →
        </RouterLink>
      </div>
    </div>

    <div class="participants">
      <h3>Зареєстровані учасники</h3>
      <p v-if="registrations.length === 0" class="empty">
        Поки що ніхто не зареєструвався. Будь першим!
      </p>
      <ul v-else class="participant-list">
        <li v-for="r in registrations" :key="r.id">
          <span class="p-name">{{ r.name }}</span>
          <span class="status-badge" :class="r.status">
            {{ r.status === 'pending' ? 'очікує підтвердження' : 'підтверджено' }}
          </span>
        </li>
      </ul>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Подію не знайдено.</p>
    <RouterLink to="/">← До списку подій</RouterLink>
  </div>
</template>

<style scoped>
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: #16171c;
  border: 1px solid #22232a;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.event-banner.large {
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 220px;
}

.event-banner.large h2 {
  font-size: 22px;
}

.detail-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-info time {
  font-size: 12px;
  color: #a3a4ad;
}

.detail-info .btn {
  align-self: flex-start;
  margin-top: 8px;
}

.participants {
  background: #16171c;
  border: 1px solid #22232a;
  border-radius: 12px;
  padding: 20px;
}

.participant-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.participant-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: #0f1013;
  border-radius: 8px;
}

.status-badge {
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 999px;
  background: #22232a;
  color: #c8c9d1;
}

.status-badge.confirmed {
  background: #1f5c3a;
  color: #b6f0cd;
}

.status-badge.pending {
  background: #4a3a1f;
  color: #f0d9a8;
}

@media (max-width: 640px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
