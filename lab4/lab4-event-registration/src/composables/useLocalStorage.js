import { ref, watch } from 'vue'

// Універсальний composable для збереження реактивних даних у localStorage.
export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)

  let initial = defaultValue
  if (stored) {
    try {
      initial = JSON.parse(stored)
    } catch (e) {
      initial = defaultValue
    }
  }

  const data = ref(initial)

  watch(
    data,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true }
  )

  return data
}
