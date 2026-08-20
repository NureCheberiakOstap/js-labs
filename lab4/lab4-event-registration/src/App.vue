<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ToastHost from './components/ToastHost.vue'
</script>

<template>
  <div class="app">
    <header class="topbar">
      <RouterLink to="/" class="brand">Події</RouterLink>
      <RouterLink to="/" class="nav-link">список подій</RouterLink>
    </header>

    <main class="content">
      <RouterView v-slot="{ Component, route }">
        <KeepAlive include="EventListView">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </RouterView>
    </main>

    <ToastHost />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #0f1013;
  color: #ece9e2;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  border-bottom: 1px solid #22232a;
}

.brand {
  font-size: 18px;
  font-weight: 700;
  color: #ece9e2;
  text-decoration: none;
}

.nav-link {
  color: #a3a4ad;
  font-size: 13px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px 60px;
}
</style>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

h1 {
  font-size: 24px;
  margin: 0 0 8px;
}

h2 {
  font-size: 18px;
  margin: 0 0 4px;
}

h3 {
  font-size: 16px;
  margin: 0 0 12px;
}

p {
  line-height: 1.5;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;
}

.btn-primary {
  background: #d9a15b;
  color: #1a1409;
}
.btn-primary:hover {
  background: #e6ac63;
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #22232a;
  color: #ece9e2;
}
.btn-secondary:hover {
  background: #2b2c34;
}

.back-link {
  display: inline-block;
  color: #a3a4ad;
  text-decoration: none;
  font-size: 13px;
  margin-bottom: 16px;
}
.back-link:hover {
  color: #ece9e2;
}

.tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: #22232a;
  color: #c8c9d1;
}

.empty {
  color: #6b6c75;
}

input[type='text'],
input[type='email'],
textarea {
  background: #16171c;
  border: 1px solid #26272f;
  color: #ece9e2;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  width: 100%;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #d9a15b;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #a3a4ad;
}

.error {
  color: #ff8a8a;
  font-size: 12px;
}
</style>
