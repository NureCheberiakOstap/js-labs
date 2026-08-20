<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['toggle-task', 'remove-task'])
</script>

<template>
  <ul class="task-list">
    <li v-if="tasks.length === 0" class="empty">Задач немає</li>

    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="emit('toggle-task', task.id)"
      @remove="emit('remove-task', task.id)"
    />
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty {
  text-align: center;
  color: #999;
  padding: 12px 0;
}
</style>
