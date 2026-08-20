import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import { useToast } from './useToast'

// registrations: { [eventId]: [{ id, name, email, status }] }
const registrations = useLocalStorage('lab4-registrations', {})

// Імітація асинхронного запиту до сервера з випадковою ймовірністю відмови (~15%)
function simulateServerRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error('Сервер тимчасово недоступний'))
      } else {
        resolve()
      }
    }, 800)
  })
}

export function useRegistrations() {
  const { addToast } = useToast()

  function getRegistrations(eventId) {
    return computed(() => registrations.value[eventId] || [])
  }

  async function registerForEvent(eventId, { name, email }) {
    if (!registrations.value[eventId]) {
      registrations.value[eventId] = []
    }

    // Оптимістичне оновлення: одразу додаємо запис зі статусом "очікує підтвердження"
    const tempId = `temp-${Date.now()}`
    const entry = { id: tempId, name, email, status: 'pending' }
    registrations.value[eventId].push(entry)

    try {
      await simulateServerRequest()

      // Успіх — підтверджуємо запис
      const list = registrations.value[eventId]
      const target = list.find((r) => r.id === tempId)
      if (target) {
        target.status = 'confirmed'
        target.id = `reg-${Date.now()}`
      }

      addToast(`Реєстрацію підтверджено для ${name}`, 'success')
      return { success: true }
    } catch (error) {
      // Невдача — відкат оптимістичної зміни
      registrations.value[eventId] = registrations.value[eventId].filter((r) => r.id !== tempId)
      addToast('Не вдалося завершити реєстрацію. Спробуйте ще раз.', 'error')
      return { success: false, error: error.message }
    }
  }

  return { getRegistrations, registerForEvent }
}
