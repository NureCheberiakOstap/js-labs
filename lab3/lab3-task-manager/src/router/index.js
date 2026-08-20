import { createRouter, createWebHistory } from 'vue-router'
import TaskListView from '../views/TaskListView.vue'
import TaskDetailView from '../views/TaskDetailView.vue'
import TaskFormView from '../views/TaskFormView.vue'
import StatsView from '../views/StatsView.vue'

const routes = [
  { path: '/', name: 'task-list', component: TaskListView },
  { path: '/tasks/new', name: 'task-new', component: TaskFormView },
  { path: '/tasks/:id', name: 'task-detail', component: TaskDetailView, props: true },
  { path: '/tasks/:id/edit', name: 'task-edit', component: TaskFormView, props: true },
  { path: '/stats', name: 'stats', component: StatsView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
