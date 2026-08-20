import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useTaskStore } from './stores/taskStore'

const app = createApp(App)

app.use(router)
app.use(createPinia())

// Персистентність: зберігаємо стан сховища задач у localStorage
// при кожній його зміні (реалізовано вручну через watch, як описано в методичці).
const taskStore = useTaskStore()

watch(
  () => taskStore.tasks,
  (tasks) => {
    localStorage.setItem('lab3-tasks', JSON.stringify(tasks))
  },
  { deep: true }
)

app.mount('#app')
