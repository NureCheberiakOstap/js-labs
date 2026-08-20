import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import EventRegisterView from '../views/EventRegisterView.vue'

const routes = [
  { path: '/', name: 'events', component: EventListView },
  { path: '/events/:id', name: 'event-detail', component: EventDetailView, props: true },
  { path: '/events/:id/register', name: 'event-register', component: EventRegisterView, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
