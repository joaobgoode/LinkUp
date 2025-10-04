<script setup>
import { ref } from 'vue'
import Header from './components/PageHeader.vue'
import Footer from './components/PageFooter.vue'
import { RouterView } from 'vue-router'
import CloudBackground from './components/CloudBackground.vue'

const clouds = ref([
  { top: '10px', left: '5%', height: '100px', opacity: 0.8 },
  { top: '30px', left: '40%', height: '150px', opacity: 1 },
  { top: '20px', left: '75%', height: '120px', opacity: 0.7 },

  { top: '150px', left: '20%', height: '80px', opacity: 0.6, transform: 'scaleX(-1)' },
  { top: '180px', left: '60%', height: '110px', opacity: 0.9 },

  { top: '300px', left: '5%', height: '130px', opacity: 0.75 },
  { top: '350px', left: '80%', height: '90px', opacity: 0.65 },
])
</script>

<template>
  <Header />

  <main class="main-content">
    <RouterView />

    <CloudBackground
      v-for="(cloud, index) in clouds"
      :key="index"
      :top="cloud.top"
      :left="cloud.left"
      :height="cloud.height"
      :opacity="cloud.opacity"
      :transform="cloud.transform"
      :z-index="0"
    />
  </main>

  <Footer />
</template>

<style scoped>
.main-content {
  position: absolute;
  top: 60px;
  background-color: #c2d6f6;
  width: 100%;
  height: calc(100% - 120px);
  flex-grow: 1;
  padding: 0;
  overflow: hidden;
}
</style>
