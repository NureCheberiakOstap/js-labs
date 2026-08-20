import { defineStore } from 'pinia'

const STORAGE_KEY = 'lab3-tasks'

// Початкові дані: якщо у localStorage вже є збережений стан — використовуємо його,
// інакше повертаємо демонстраційний набір задач.
function loadInitialTasks() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      // пошкоджені дані в localStorage ігноруємо і використовуємо значення за замовчуванням
    }
  }

  return [
    {
      id: 1,
      title: 'Підготувати презентацію до захисту',
      description:
        'Підготувати слайди для захисту лабораторної роботи №3. Включити опис архітектури, Pinia store та Vue Router.',
      category: 'Робота',
      priority: 'Високий',
      deadline: '2026-08-18',
      done: false,
      createdAt: '2026-08-10',
    },
    {
      id: 2,
      title: 'Прочитати документацію Vue Router',
      description: "Розібратись із динамічними маршрутами та навігаційними хуками бібліотеки.",
      category: 'Навчання',
      priority: 'Середній',
      deadline: '2026-08-25',
      done: true,
      createdAt: '2026-08-08',
    },
    {
      id: 3,
      title: 'Написати unit-тести для store',
      description: 'Покрити тестами основні actions та getters Pinia-сховища задач.',
      category: 'Робота',
      priority: 'Низький',
      deadline: '2026-08-22',
      done: false,
      createdAt: '2026-08-12',
    },
    {
      id: 4,
      title: 'Купити продукти на тиждень',
      description: 'Молоко, хліб, овочі, кава.',
      category: 'Особисте',
      priority: 'Низький',
      deadline: '2026-08-21',
      done: false,
      createdAt: '2026-08-15',
    },
  ]
}

export const useTaskStore = defineStore('tasks', {
  // state — реактивні дані сховища
  state: () => ({
    tasks: loadInitialTasks(),
    nextId: 5,
  }),

  // getters — похідні (обчислювані) дані на основі state
  getters: {
    activeTasks: (state) => state.tasks.filter((t) => !t.done),

    doneTasks: (state) => state.tasks.filter((t) => t.done),

    overdueTasks: (state) => {
      const today = new Date().toISOString().slice(0, 10)
      return state.tasks.filter((t) => !t.done && t.deadline && t.deadline < today)
    },

    tasksByCategory: (state) => {
      const counts = {}
      for (const t of state.tasks) {
        counts[t.category] = (counts[t.category] || 0) + 1
      }
      return counts
    },

    // задачі з дедлайном протягом найближчих 3 днів
    upcomingDeadlines: (state) => {
      const today = new Date()
      const todayStr = today.toISOString().slice(0, 10)
      const in3Days = new Date(today)
      in3Days.setDate(today.getDate() + 3)
      const in3DaysStr = in3Days.toISOString().slice(0, 10)

      return state.tasks
        .filter((t) => !t.done && t.deadline >= todayStr && t.deadline <= in3DaysStr)
        .sort((a, b) => a.deadline.localeCompare(b.deadline))
    },

    getById: (state) => (id) => state.tasks.find((t) => String(t.id) === String(id)),
  },

  // actions — методи для зміни state
  actions: {
    addTask(task) {
      this.tasks.push({
        id: this.nextId++,
        done: false,
        createdAt: new Date().toISOString().slice(0, 10),
        ...task,
      })
    },

    updateTask(id, updates) {
      const task = this.tasks.find((t) => String(t.id) === String(id))
      if (task) Object.assign(task, updates)
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => String(t.id) !== String(id))
    },

    toggleDone(id) {
      const task = this.tasks.find((t) => String(t.id) === String(id))
      if (task) task.done = !task.done
    },
  },
})
