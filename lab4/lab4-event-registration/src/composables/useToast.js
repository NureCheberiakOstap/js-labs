import { ref } from 'vue'

// Спільний (модульний) реактивний стан сповіщень
const toasts = ref([])
let idCounter = 0

export function useToast() {
  function addToast(message, type = 'info') {
    const id = idCounter++
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 4000)
  }

  return { toasts, addToast }
}
