<script>
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'

export default {
  data() {
    return {
      menuList: [{
        name: '铺面',
        id: 'ground',
        icon: 'fas fa-layer-group',
        subMenuList: [{
          name: '地面',
          id: 'create ground'
        },{
          name: '草坪',
          id: 'create lawn'
        },{
          name: '沙滩',
          id: 'create beach'
        },{
          name: '人造湖',
          id: 'create water'
        }]
      },{
        name: '铺路',
        id: 'path',
        icon: 'fas fa-road',
        subMenuList: [{
          name: '街道',
          id: 'create street'
        },{
          name: '人行道',
          id: 'create walking path'
        }]
      },{
        name: '建筑',
        id: 'buildings',
        icon: 'fas fa-building',
        subMenuList: [{
          name: '3层建筑',
          id: '3-story-building'
        },{
          name: '5层建筑',
          id: '5-story-building'
        },{
          name: '10层建筑',
          id: '10-story-building'
        }]
      },{
        name: '指示图标',
        id: 'icons',
        icon: 'fas fa-map-marker-alt',
        type: 'gallery'
      },{
        name: '植物',
        id: 'tree',
        icon: 'fas fa-tree',
        type: 'gallery'
      },{
        name: '交通工具',
        id: 'vehicles',
        icon: 'fas fa-car',
        type: 'gallery'
      }],
      menuIndex: -1
    }
  },
  methods:{
    createPlan() {
      this.$store.commit('switchStartState', true)
    },
    submitPlan(){},
  }
}

</script>

<template>
  <div id="menu-wrp">
    <div class="new-plan" @click="createPlan">新计划</div>
    <ul id="main-menu" >
      <li :class="['menuItem',index==menuIndex?'active':''] " v-for="(menu,index) in menuList" :key="menu.id" @click="switchViewPort(menu.id)">
        <span :class="[menu.icon]"></span>
        <span>{{menu.name}}</span>
      </li>
    </ul>
    <div class="new-plan" @click="submitPlan">提交计划</div>
  </div>
</template>

<style scoped lang="scss">
  #menu-wrp{
    position: fixed;
    display:flex;
    align-items: center;
    border-radius: 6px;
    background: rgba($color: #fff, $alpha: .6);
    line-height: 2;
    padding: 10px;
    font-size: 18px;
    bottom: 40px;
    user-select:none;
    text-align: center;
    cursor: pointer;
    
    ul{
      display: flex;
      align-items: center;
      margin: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0px;

    }
    div,li{
      text-decoration: none;
      list-style: none;
      width: 110px;
      text-align: center;
      border-radius: 4px;
      font-size: 18px;
      line-height: 3;
      margin: 0;
      &:hover,&.active{
        background: rgba($color: #fff, $alpha: .7);
        cursor: pointer;
      }
    }
    li{
      display: flex;
      flex-direction: column;
      line-height: 2;
      span:first-child{
        font-size:22px;
        padding-top: 6px;
      }
      span:last-child{
        font-size: 14px;
      }
    }
  }
</style>
