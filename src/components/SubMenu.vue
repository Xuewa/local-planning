<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['subMenu','geoId'])
  },  
  methods:{
    drawGeomestry(geoId, color) {
      this.$store.commit('switchGeoId', geoId)
      this.$store.commit('switchGeoColor', color)
      if (geoId=='ground'||geoId == 'water'||geoId=='lawn'||geoId=='beach'){
        this.$store.commit('switchGeoType', 'polygon')
      } else if (geoId=='street'||geoId=='walking path'){
        this.$store.commit('switchGeoType', 'polyline')
      } else if (geoId.indexOf('story')!==-1){
        this.$store.commit('switchGeoType', 'polyline3D')
      }
    }
  }
}
</script>
<template>
  <ul id="sub-menu" v-if="subMenu&&subMenu.length">
    <li :class="['menuItem',menu.id==geoId?'active':''] " v-for="menu in subMenu" 
        :key="menu.id" @click="drawGeomestry(menu.id, menu.color)">
      <span>{{menu.name}}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  ul#sub-menu{
    position: fixed;
    display:flex;
    align-items: center;
    border-radius: 6px;
    background: rgba($color: #fff, $alpha: .6);
    line-height: 2;
    padding: 10px;
    font-size: 18px;
    bottom: 130px;
    user-select:none;
    text-align: center;
    cursor: pointer;
    margin: 0;
    li{
      text-decoration: none;
      list-style: none;
      width: 110px;
      text-align: center;
      border-radius: 4px;
      font-size: 16px;
      line-height: 2;
      margin-right: 2px;
      &:hover,&.active{
        background: rgba($color: #fff, $alpha: .7);
        cursor: pointer;
      }
    }
  }
</style>
