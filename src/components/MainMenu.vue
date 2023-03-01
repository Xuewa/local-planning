<script>
import {toRaw} from 'vue'

export default {
  data() {
    return {
      menuList: [{
        name: '铺面',
        id: 'ground',
        icon: 'fas fa-layer-group',
        subMenuList: [{
          name: '地面',
          id: 'ground',
          color: '#f0f0f0'
        },{
          name: '草坪',
          id: 'lawn',
          color: '#bdce8a'
        },{
          name: '沙滩',
          id: 'beach',
          color: '#dfca8f'
        },{
          name: '人造湖',
          id: 'water',
          color: '#a0b4cf'
        }]
      },{
        name: '铺路',
        id: 'path',
        icon: 'fas fa-road',
        subMenuList: [{
          name: '街道',
          id: 'street',
          color: '#cbcbcb'
        },{
          name: '人行道',
          id: 'walking path',
          color: '#b2b2b2'
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
          name: '9层建筑',
          id: '9-story-building'
        }]
      },{
        name: '指示图标',
        id: 'Icons',
        icon: 'fas fa-map-marker-alt',
        type: 'gallery'
      },{
        name: '植物',
        id: 'Trees',
        icon: 'fas fa-tree',
        type: 'gallery'
      },{
        name: '交通工具',
        id: 'Vehicles',
        icon: 'fas fa-car',
        type: 'gallery'
      }],
      menuId: -1
    }
  },
  methods:{
    createPlan() {
      this.$store.commit('switchStartState', true)
    },
    switcMainMenu(menuId){
      this.menuId = menuId
      this.menuList.forEach(item=>{
        if (item.id == menuId) {
          this.$store.commit('switchSubMenuState', toRaw(item.subMenuList))
          console.log(item.subMenuList)
          if (!item.subMenuList) {
            this.$store.commit('switchGeoId', menuId)
            this.$store.commit('switchSubMenuState', [])
            this.$store.commit('switchGeoType', 'point')
          }
        }
      })
    },
  }
}
</script>
<template>
  <div id="menu-wrp">
    <div class="new-plan" @click="createPlan">新计划</div>
    <ul id="main-menu" >
      <li :class="['menuItem',menu.id==menuId?'active':''] " v-for="(menu) in menuList" 
      :key="menu.id" @click="switcMainMenu(menu.id)">
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
