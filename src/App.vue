<script setup>
import Scene from './components/Scene.vue'
import TopBar from './components/TopBar.vue'
import MainMenu from './components/MainMenu.vue'
import SubMenu from './components/SubMenu.vue'
import Loading from './components/Loading.vue'
import CanvasEle from './components/CanvasEle.vue'

</script>

<template>
  <!-- 地图view -->
  <Scene />
  <!-- 顶部视角菜单 -->
  <TopBar />
  <!-- 次菜单 -->
  <SubMenu />
  <!-- 主菜单 -->
  <MainMenu />
  <Loading :loadingshow='false'/>
  <CanvasEle />
</template>

<style scoped>
</style>
