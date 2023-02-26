<script>
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'

export default {
  data() {
    return {
      viewPortList: [{
        id: 'Shore',
        name: '海岸线',
      },{
        id: 'Bridge',
        name: '望桥',
      },{
        id: 'Neighborhood',
        name: '街区'
      }],
      viewPortIndex: -1
    }
  },
  methods:{
    switchViewPort(vpId) {
      this.$store.commit('switchViewPort', vpId)
      this.viewPortList.forEach((vp,idx)=>{
        if (vp.id==vpId) {
          this.viewPortIndex = idx
        }
      })
    }
  }
}

</script>

<template>
  <ul id="top-bar" >
    <li :class="['viewPortItem',index==viewPortIndex?'active':''] " v-for="(vp,index) in viewPortList" :key="vp.id" @click="switchViewPort(vp.id)">{{vp.name}}</li>
  </ul>
  
</template>

<style scoped lang="scss">
  #top-bar{
    display:flex;
    border-radius: 6px;
    background: rgba($color: #fff, $alpha: .6);
    line-height: 2;
    padding: 10px;
    font-size: 18px;
    position: fixed;
    li{
      text-decoration: none;
      list-style: none;
      width: 100px;
      text-align: center;
      border-radius: 4px;
      margin: 0;
      &:hover,&.active{
        background: rgba($color: #fff, $alpha: .7);
        cursor: pointer;
      }
    }
  }
</style>
