<script >
// 调用this.的属性要用toRaw
import {toRaw} from 'vue'
import {mapState} from 'vuex'
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'
// 矢量瓦片图层
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer"
import SpatialReference from '@arcgis/core/geometry/SpatialReference'
import Polygon from '@arcgis/core/geometry/Polygon'
import Graphic from '@arcgis/core/Graphic'
import Collection from "@arcgis/core/core/Collection"
import Slide from "@arcgis/core/WebScene/Slide"

export default {
  data() {
    return {
      map: WebScene,
      view: SceneView,
      vectorLayer: VectorTileLayer,
      maskGraphic: Graphic,
      slides: Collection
    }
  },
  created() {
    const map = new WebScene({
      portalItem: {
        id: 'bceae470c9a04e5bb3ad42323c726c97',
      },
    });
    this.map = map
    const view = new SceneView({
        map: map,
        qualityProfile: 'medium',
    })
    this.view = view
    // this.slides = toRaw(this.map).presentation.slides
    // console.log(this.slides)
  },
  computed: {
    ...mapState(['viewPortId'])
  },
  watch: {
    viewPortId (newVal) {
      this.switchViewPort(newVal)
    }
  },
  mounted() {
    // 初始化map、view、vectorTileLayer
    this.initScene()
    this.startAnimation()
  },
  methods: {
    initScene() {
      toRaw(this.view).container = 'sceneView'
      toRaw(this.view).when(()=>{
        // 矢量瓦片图层
        const vectorLayer = new VectorTileLayer({
          portalItem: {
            id: '5cf1abb43c25482e8a9e373953498999',
          },
          visible: false
        })
        toRaw(this.map).add(vectorLayer)
        const planningArea= [[-8235924.058660398, 4968738.274357371],
        [-8235409.000644938, 4968717.325404106],
        [-8235333.439527529, 4968898.289607817],
        [-8235295.877979361, 4969109.891441089],
        [-8236134.357229519, 4969027.878528339],
        [-8236138.632189713, 4968850.261903069],
        [-8235919.081131686, 4968836.806196137]]
        // 生成抽象面
        const maskPolygon = new Polygon({
          rings: [planningArea],
          spatialReference: SpatialReference.WebMercator
        })
        console.log(maskPolygon)
        // 生成面的符号，才可以在图层显示
        const polygonSymbol = {
          type: 'simple-fill',
          color: [226, 119, 40, 0],
          outline: {
            width: 0
          }
        }
        // 生成graphic图形，在图层显示
        const maskGraphic = new Graphic({
          symbol: polygonSymbol,
          geometry: maskPolygon
        })
        // 拉近
        this.maskGraphic = maskGraphic
        // console.log(toRaw(this.map).presentation.slides)
        toRaw(this.view)
          .goTo(maskGraphic)
          .catch(function(error) {
            // if (error.name != "AbortError") {
              console.error(error);
            // }
          });
      })
    },
    startAnimation() {
      // 拉近view
      // 描边
      // 同颜色盖住
      // 切换视角
      // 拉近
    },
    switchViewPort(vpId) {
      var slides = toRaw(this.map).presentation.slides
      // console.log(slides)
      var tempVP = toRaw(slides.getItemAt(0))
      slides.forEach((item)=>{
        if (item.title.text == vpId) {
          tempVP = item
          console.log(toRaw(tempVP.viewpoint))
        }
      })
      toRaw(this.view).goTo(tempVP.viewpoint)
    }
  }
}
</script>

<template>
  <div id="scene" ref="scene">
    <div id="sceneView" ref="sceneView"></div>
  </div>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
