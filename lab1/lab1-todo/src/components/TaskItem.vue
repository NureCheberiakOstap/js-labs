<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="task-item" :class="{ done: task.done }">
    <label class="task-label">
      <input
        type="checkbox"
        :checked="task.done"
        @change="emit('toggle')"
      />
      <span>{{ task.text }}</span>
    </label>

    <button class="remove-btn" @click="emit('remove')">✕</button>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 6px;
  border-bottom: 1px solid #eee;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.task-item.done .task-label span {
  text-decoration: line-through;
  color: #999;
}

.remove-btn {
  border: none;
  background: transparent;
  color: #e74c3c;
  cursor: pointer;
  font-size: 16px;
}
</style>
