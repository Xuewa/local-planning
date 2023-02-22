<script setup>
import Scene from './components/Scene.vue'
import Box from './components/box/Box.vue'
import Loading from './components/Loading.vue'
</script>

<template>
  <!-- 地图view -->
  <Scene />
  <!-- box：用户操作 -->
  <Box />
  <Loading :loadingshow='false'/>

  
</template>

<style scoped>
</style>
