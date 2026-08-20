import { ref } from 'vue'

// Модульний (singleton) реактивний стан — спільний для всіх компонентів,
// які викликають цей composable, без потреби у Pinia.
const events = ref([
  {
    id: 1,
    title: 'Vue Meetup',
    description: 'Talks, networking and snacks — meet other Vue devs.',
    date: '2026-09-05',
    category: 'Мітап',
    gradient: 'linear-gradient(135deg, #7c5cff, #4a2fd6)',
  },
  {
    id: 2,
    title: 'Frontend Conf',
    description: 'Performance, accessibility, modern tooling.',
    date: '2026-09-12',
    category: 'Конференція',
    gradient: 'linear-gradient(135deg, #12c48b, #0a8f66)',
  },
  {
    id: 3,
    title: 'Hackathon',
    description:
      '48 hours to build something awesome — mentors, prizes and unforgettable experience.',
    date: '2026-10-20',
    category: 'Хакатон',
    gradient: 'linear-gradient(135deg, #ff9d4d, #ff5f5f)',
  },
  {
    id: 4,
    title: 'JS Deep Dive',
    description: 'A closer look at the event loop, promises and modern async patterns.',
    date: '2026-11-02',
    category: 'Воркшоп',
    gradient: 'linear-gradient(135deg, #4d9dff, #2f5fd6)',
  },
])

export function useEvents() {
  function getEventById(id) {
    return events.value.find((e) => String(e.id) === String(id))
  }

  return { events, getEventById }
}
