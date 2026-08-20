<script setup>
defineOptions({ name: 'EventRegisterView' })

import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistrations } from '../composables/useRegistrations'

const route = useRoute()
const router = useRouter()
const { getEventById } = useEvents()
const event = getEventById(route.params.id)

const { registerForEvent } = useRegistrations()

const name = ref('')
const email = ref('')
const errors = ref({})
const isSubmitting = ref(false)

function validate() {
  errors.value = {}

  if (!name.value.trim()) {
    errors.value.name = "Введіть ім'я"
  }

  if (!email.value.trim()) {
    errors.value.email = 'Введіть email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Некоректний email'
  }

  return Object.keys(errors.value).length === 0
}

async function submit() {
  if (!validate() || !event) return

  isSubmitting.value = true
  const result = await registerForEvent(event.id, {
    name: name.value.trim(),
    email: email.value.trim(),
  })
  isSubmitting.value = false

  if (result.success) {
    router.push(`/events/${event.id}`)
  }
  // при невдачі користувач лишається на формі і може спробувати ще раз;
  // повідомлення про помилку показано через toast (useToast)
}
</script>

<template>
  <div v-if="event" class="register-view">
    <RouterLink :to="`/events/${event.id}`" class="back-link">← Назад</RouterLink>

    <h1>{{ event.title }}</h1>
    <time>{{ event.date }}</time>
    <p class="desc">{{ event.description }}</p>

    <form class="register-form" @submit.prevent="submit">
      <h3>Реєстрація</h3>
      <p class="hint">Заповніть форму і ми надішлемо підтвердження на вашу пошту</p>

      <label>
        Ім'я
        <input v-model="name" type="text" placeholder="Ваше ім'я" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </label>

      <label>
        Email
        <input v-model="email" type="email" placeholder="you@example.com" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </label>

      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Реєстрація...' : 'Зареєструватися' }}
      </button>
    </form>
  </div>

  <div v-else class="not-found">
    <p>Подію не знайдено.</p>
    <RouterLink to="/">← До списку подій</RouterLink>
  </div>
</template>

<style scoped>
.desc {
  color: #c8c9d1;
  margin-bottom: 20px;
}

.register-form {
  max-width: 380px;
  background: #16171c;
  border: 1px solid #22232a;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.hint {
  font-size: 12px;
  color: #a3a4ad;
  margin: -4px 0 4px;
}

.register-form .btn {
  margin-top: 4px;
}
</style>
