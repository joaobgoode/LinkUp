<template>
  <header class="app-header">
    <div class="left-content">
      <button
        v-if="$route.name !== 'home' && $route.name !== 'link-handler'"
        @click="logout"
        class="logout-btn"
      >
        Sair
      </button>
    </div>

    <div class="center-content">
      <span class="app-title">LinkUp</span>
    </div>

    <div class="right-content"></div>
  </header>
</template>

<script setup>
import { logoutService } from '@/services/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  logoutService(router)
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #92b6f0;
  color: white;
  padding: 0 20px;
}

.left-content,
.right-content {
  flex-basis: 100px;
  display: flex;
  align-items: center;
}

.left-content {
  justify-content: flex-start;
}

.center-content {
  flex-grow: 1;
  text-align: center;
}

.app-title {
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.logout-btn {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
