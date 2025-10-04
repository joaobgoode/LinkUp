<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  top: {
    type: String,
    default: '0',
  },
  left: {
    type: String,
    default: '0',
  },
  height: {
    type: String,
    default: '120px',
  },
  zIndex: {
    type: [Number, String],
    default: 0,
  },
})

const cloudStyles = computed(() => ({
  top: props.top,
  left: props.left,
  height: props.height,
  zIndex: props.zIndex,
}))
</script>

<template>
  <div class="cloud"></div>
</template>

<style lang="css" scoped>
.cloud {
  position: absolute;
  top: v-bind('cloudStyles.top');
  left: v-bind('cloudStyles.left');
  height: v-bind('cloudStyles.height');
  aspect-ratio: 1.8;
  --g: radial-gradient(50% 50%, #000 98%, #0000) no-repeat;
  mask:
    var(--g) 100% 100%/30% 60%,
    var(--g) 70% 0/50% 100%,
    var(--g) 0 100%/36% 68%,
    var(--g) 27% 18%/26% 40%,
    linear-gradient(#000 0 0) bottom/67% 58% no-repeat;
  background: #d1dff6;
  z-index: v-bind('cloudStyles.zIndex');
}
</style>
