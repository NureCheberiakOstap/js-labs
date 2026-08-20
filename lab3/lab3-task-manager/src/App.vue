<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="topbar">
      <span class="brand">Менеджер задач</span>
      <nav class="topnav">
        <RouterLink to="/" class="nav-link" active-class="active">Задачі</RouterLink>
        <RouterLink to="/stats" class="nav-link" active-class="active">Статистика</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #14151a;
  color: #e6e6ea;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  background: #1b1c22;
  border-bottom: 1px solid #2a2b33;
}

.brand {
  font-weight: 700;
  font-size: 18px;
}

.topnav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #9a9ba5;
  text-decoration: none;
  font-size: 14px;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.nav-link.active {
  color: #a78bfa;
  border-bottom-color: #a78bfa;
}

.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 28px 20px 60px;
}

/* Анімація переходів між маршрутами */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<style>
/* Глобальні стилі, спільні для всіх сторінок застосунку */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

h1 {
  font-size: 22px;
  margin: 0 0 12px;
}

h3 {
  margin: 0 0 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;
}

.btn-primary {
  background: #7c5cff;
  color: #fff;
}
.btn-primary:hover {
  background: #6b47ff;
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #2a2b33;
  color: #e6e6ea;
}
.btn-secondary:hover {
  background: #34353f;
}

.btn-danger {
  background: #3a1f22;
  color: #ff8a8a;
}
.btn-danger:hover {
  background: #4a2226;
}

.back-link {
  display: inline-block;
  color: #a78bfa;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 14px;
}

.empty {
  color: #71727d;
  padding: 20px 0;
}

.tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: #2a2b33;
  color: #cfcfd6;
}

.tag-category {
  background: #23303f;
  color: #7fb8e0;
}

.tag-Низький {
  background: #1f3a2a;
  color: #7fd99a;
}
.tag-Середній {
  background: #3a3620;
  color: #e0c86e;
}
.tag-Високий {
  background: #3a2323;
  color: #e08a8a;
}

input[type='text'],
input[type='email'],
input[type='date'],
select,
textarea {
  background: #1e1f26;
  border: 1px solid #2f3039;
  color: #e6e6ea;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 14px;
  font-family: inherit;
  width: 100%;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #7c5cff;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #9a9ba5;
}

.error {
  color: #ff8a8a;
  font-size: 12px;
}

.card {
  background: #1b1c22;
  border: 1px solid #2a2b33;
  border-radius: 12px;
  padding: 20px;
}
</style>
