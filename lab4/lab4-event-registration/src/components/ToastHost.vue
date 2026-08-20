<script setup>
import { useToast } from '../composables/useToast'

const { toasts } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="toast-host">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.type">
        {{ t.message }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-host {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.toast {
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
  background: #2a2b33;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  min-width: 220px;
  animation: toast-in 0.2s ease;
}

.toast.success {
  background: #1f5c3a;
}

.toast.error {
  background: #5c2323;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
