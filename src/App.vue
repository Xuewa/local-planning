<script setup>
import Scene from './components/Scene.vue'
import TopBar from './components/TopBar.vue'
import MainMenu from './components/MainMenu.vue'
import SubMenu from './components/SubMenu.vue'
import Loading from './components/Loading.vue'
</script>

<template>
  <!-- 地图view -->
  <Scene />
  <!-- 顶部视角菜单 -->
  <TopBar />
  <SubMenu />
  <MainMenu />
  <Loading :loadingshow='false'/>

  
</template>

<style scoped>
</style>
