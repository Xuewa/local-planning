<script>
import { mapState } from 'vuex'
import Portal from "@arcgis/core/portal/Portal"
import PortalQueryParams from "@arcgis/core/portal/PortalQueryParams"

export default {
  data() {
    return{
      SymbolGroupId: {
        Icons: "Icons",
        Trees: "Trees",
        Vehicles: "Vehicles",
      },
      galleryGroups: {
         Icons:[],
         Trees: [],
         Vehicles: []
      }
    }
  },
  computed: {
    ...mapState(['geoId'])
  },
  created() {
    this.loadGallery(this.SymbolGroupId.Icons)
    this.loadGallery(this.SymbolGroupId.Trees)
    this.loadGallery(this.SymbolGroupId.Vehicles)
  },
  mounted() {

  },
  methods:{
    loadGallery(iconType) {
      let portal = new Portal()
      portal.load().then((portal)=>{
         return portal.queryGroups({
          query: "title:\"Esri Styles\" AND owner:esri_en",
        });
      }).then((groups) => {
        const queryParams = new PortalQueryParams({
          num: 20,
          sortField: "title",
        })
        return groups.results[0].queryItems(queryParams)
      }).then((groups)=>{
        const groupStyleName = this.getGroupStyleName(iconType)
        const groupsResult = groups.results
        groupsResult.forEach(groupItem => {
          var tkw = ''
          groupItem.typeKeywords.forEach(kw=>{
            if (kw==groupStyleName) {
              tkw = kw
              return
            }
          })
          if (tkw!=='') {
            groupItem.fetchData().then((data)=>{
              this.galleryGroups[iconType]= data.items
            })
          }
        });
      })
    },
    getGroupStyleName(iconType) {
      switch (iconType) {
        case this.SymbolGroupId.Icons:
          return 'EsriIconsStyle'
        case this.SymbolGroupId.Trees:
          return 'EsriRealisticTreesStyle'
         case this.SymbolGroupId.Vehicles:
          return 'EsriRealisticTransportationStyle'
      }
    },
    selectSymbolItem(symbolItem) {
      this.$store.commit('switchSymbolItem', symbolItem)
      this.$store.commit('switchGalleryShow', false)
    },
  }
}
</script>
<template>
  <ul class="gallery-grid" >
    <li :class="['gallery-grid-item'] " v-for="item in galleryGroups[geoId]" 
        :key="item.id" @click="selectSymbolItem(item)" >
      <img :src="item.thumbnail.href" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
  ul.gallery-grid{
    overflow-x: auto;
    overflow-y: auto;
    text-align: center;
    cursor: pointer;
    bottom: 120px;
    position: fixed;
    left: 0;
    li{
      height: 70px;
      width: 70px;
      margin: 2px;
      display: inline-block;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.53);
      border-radius: 10px;
    }
  }
</style>
