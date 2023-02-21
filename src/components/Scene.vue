<script setup>
import { ref,onMounted } from 'vue'
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'
// import WebMap from "@arcgis/core/WebMap"


defineProps({
  msg: String,
})

const count = ref(0)

onMounted(() => {
  const map = new WebScene({
      portalItem: {
        id: 'bceae470c9a04e5bb3ad42323c726c97',
      },
    });

  const view = new SceneView({
      map: map,
      qualityProfile: 'medium',
      container: 'scene'
    })
})
</script>

<template>
  <div id="scene" ref="scene"></div>
 
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
