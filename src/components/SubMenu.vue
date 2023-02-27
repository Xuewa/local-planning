<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['subMenu'])
  },  
  methods:{
    drawGeomestry(geoId) {
      
    }
  }
}
</script>
<template>
  <ul id="sub-menu" >
    <li :class="['menuItem',index==0?'active':''] " v-for="(menu,index) in subMenu" 
        :key="menu.id" @click="drawGeomestry(menu.id)">
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
