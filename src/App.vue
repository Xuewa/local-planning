<script setup>
import Scene from './components/Scene.vue'
import TopBar from './components/TopBar.vue'
import Menu from './components/Menu.vue'
import Loading from './components/Loading.vue'
</script>

<template>
  <!-- 地图view -->
  <Scene />
  <!-- 顶部视角菜单 -->
  <TopBar />
  <Menu />
  <Loading :loadingshow='false'/>

  
</template>

<style scoped>
</style>
