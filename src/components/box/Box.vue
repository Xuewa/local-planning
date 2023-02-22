<script setup>
import TopBar from './TopBar.vue'
</script>

<template>
  <div id="box" ref="box">
    <top-bar />
  </div>
  
</template>

<style scoped>
  #box{
    position: absolute;
    height: 100%;
  }
</style>
