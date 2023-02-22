<script>
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'

export default {
  data() {
    return {
      viewPortList: [{
        id: 'shore',
        name: '海岸线',
      },{
        id: 'bridge',
        name: '望桥',
      },{
        id: 'neighborhood',
        name: '街区'
      }]
    }
  },
  methods:{
    switchViewPort(vpId) {
      this.$store.commit('switchViewPort', vpId)
    }
  }
}

</script>

<template>
  <ul id="top-bar" >
    <li class="viewPortItem" v-for="vp in viewPortList" :key="vp.id" @click="switchViewPort(vp.id)">{{vp.name}}</li>
  </ul>
  
</template>

<style scoped lang="scss">
  #top-bar{
    display:flex;
    border-radius: 6px;
    background: rgba($color: #fff, $alpha: .8);
    line-height: 2;
    padding: 10px;
    font-size: 18px;
    li{
      text-decoration: none;
      list-style: none;
      width: 100px;
      text-align: center;
      border-radius: 4px;
      &:hover{
        background: rgba($color: #fff, $alpha: .9);
        cursor: pointer;
      }
    }
  }
</style>
