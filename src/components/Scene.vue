<script >
// 调用this.的属性要用toRaw
import anime from "animejs";
import {toRaw} from 'vue'
import {mapState} from 'vuex'
import WebScene from '@arcgis/core/WebScene'
import SceneView from '@arcgis/core/views/SceneView'
// 矢量瓦片图层
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer"
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter"
import SpatialReference from '@arcgis/core/geometry/SpatialReference'
import Polygon from '@arcgis/core/geometry/Polygon'
import Polyline from '@arcgis/core/geometry/Polyline'
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol"
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D"
import Graphic from '@arcgis/core/Graphic'
import Color from "@arcgis/core/Color";
import Collection from "@arcgis/core/core/Collection"
import {whenNotOnce} from "@arcgis/core/core/watchUtils"
const BUILDING_COLOR = "#FFFFFF"
const BUILDING_FLOOR_HEIGHT = 3
export default {
  data() {
    return {
      map: WebScene,
      view: SceneView,
      vectorLayer: VectorTileLayer,
      sketchLayer: GraphicsLayer,
      maskGraphic: Graphic,
      maskPolyline: Graphic,
      maskPolygon: Polygon,
      slides: Collection,
      planningArea: Array,
      EMPTY_LINE: Polygon,
    }
  },
  created() {
    this.initScene()
  },
  computed: {
    ...mapState(['viewPortId', 'startState', 'geoId', 'geoColor', 'geoType', 'currentOperation','symbolItem'])
  },
  watch: {
    viewPortId (newVal) {
      this.switchViewPort(newVal)
    },
    startState (newVal) {
      if (newVal) {
        this.startAnimation()
      }
    },
    geoId(newVal) {
      if (newVal!==''&&this.geoType == 'polygon') {
        const polygonSymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: this.geoColor,
          outline: {
            width: 0
          }
        }
        this.createPolygon(polygonSymbol)
      } else if(newVal!==''&&this.geoType=='polyline') {
        const symbol = new SimpleLineSymbol({
          color: this.geoColor,
          width: 16
        })
        this.createPolyline(symbol)
      } else if(newVal!==''&&this.geoType=='polyline3D') {
        var size = parseInt(newVal[0])
        size = size * BUILDING_FLOOR_HEIGHT;
        const color = BUILDING_COLOR;
        const symbol = new PolygonSymbol3D({
          symbolLayers: [{
            type: "extrude",
            material: {
              color,
            },
            edges: {
              type: "solid",
              color: [100, 100, 100],
            },
            size
          }]
        })
        this.createPolygon(symbol)
      }
    }
  },
  mounted() {
    toRaw(this.view).container = 'sceneView'
    this.startAnimation()
  },
  methods: {
    // 初始化map、view、vectorTileLayer、mask
    initScene() {
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
      // 绑定view 点击事件
      view.on("click", (event) => {
        if (!this.currentOperation) {
          view.hitTest(event)
          .then((response) => {
            console.log(response)
            response.results.some((result) => {
              const graphic = result.graphic;
              if (graphic && graphic.geometry) {
                // return this.updateGraphic(graphic);
              }
              return false;
            });
          });
        }
      });
      this.vectorLayerInit()
      // 区域area
      this.planningArea= [[-8235924.058660398, 4968738.274357371],
      [-8235409.000644938, 4968717.325404106],
      [-8235333.439527529, 4968898.289607817],
      [-8235295.877979361, 4969109.891441089],
      [-8236134.357229519, 4969027.878528339],
      [-8236138.632189713, 4968850.261903069],
      [-8235919.081131686, 4968836.806196137]]

      // 生成抽象面
      const maskPolygon = new Polygon({
        rings: [this.planningArea],
        spatialReference: SpatialReference.WebMercator
      })
      // 生成面的符号，才可以在图层显示
      const polygonSymbol = this.polygonSymbolFunc(new Color([226, 119, 40, 0]))
      // 生成graphic图形，在图层显示
      const maskGraphic = new Graphic({
        symbol: polygonSymbol,
        geometry: maskPolygon
      })
      this.maskPolygon = maskPolygon
      // 拉近
      this.maskGraphic = maskGraphic
      // 描边
      const EMPTY_LINE = new Polyline({
              paths: [[[0, 0], [1, 1]]],
              spatialReference: SpatialReference.WebMercator,
            })
      this.EMPTY_LINE = EMPTY_LINE            
      this.maskPolyline = new Graphic({
        geometry: toRaw(this.EMPTY_LINE),
        symbol: {
          type: "line-3d",
          symbolLayers: [{
            type: "line",
            size: 6,
            material: { color: new Color([226, 119, 40])},
          }],
        }
      })
      this.sketchLayerInit()
    },
    // 图形图层
    sketchLayerInit() {
      const sketchLayer = new GraphicsLayer({
        elevationInfo: {
          mode: "on-the-ground",
        },
      })
      this.sketchLayer = sketchLayer
      toRaw(this.map).add(toRaw(this.sketchLayer))
      toRaw(this.sketchLayer).add(toRaw(this.maskGraphic))
      toRaw(this.sketchLayer).add(toRaw(this.maskPolyline))
      const highlightMaskSymbol = this.polygonSymbolFunc([256,256,256,.15])
      const highlightMaskGraphic = new Graphic({
        symbol: highlightMaskSymbol,
        geometry: toRaw(this.maskPolygon)
      })
      toRaw(this.sketchLayer).add(highlightMaskGraphic)
    },
    // 矢量瓦片图层
    vectorLayerInit(){
      const vectorLayer = new VectorTileLayer({
        portalItem: {
          id: '5cf1abb43c25482e8a9e373953498999',
        },
        visible: false
      })
      toRaw(this.map).add(vectorLayer)
      this.vectorLayer = vectorLayer
    },
    polygonSymbolFunc(color){
      const polygonSymbol = {
        type: 'simple-fill',
        color,
        outline: {
          width: 0
        }
      }
      return polygonSymbol
    },
    startAnimation() {
      return whenNotOnce(toRaw(this.view), 'updating')
        // 下沉拉近view
        .then(() => {
          toRaw(this.vectorLayer).visible = false
          toRaw(this.view).goTo(toRaw(this.maskGraphic))})
        // 描边
        .then(() => this.areaLineAnimation())
        // 同颜色盖住
        .then(() => this.maskAnimation())
        .then(() =>{
          // this.disJointBuilding()
        // 拉近初始角度
        }).then(() => {
          this.startPlan()
          this.$store.commit('switchStartState', false)

        }).catch((err)=>{
          console.error(err)
        })
    },
    areaLineAnimation() {
      const AREA_ANIMATION_DURATION = 2000
      var points = toRaw(this.planningArea).slice(1)
      points.push(toRaw(this.planningArea[0]))
      let durations = []
      let totalDis = 0
      let disArr = []
      // 计算边长
      points.forEach((point,index)=>{
        let x = point[0] - toRaw(this.planningArea[index][0])
        let y = point[1] - toRaw(this.planningArea[index][1])
        let distance = Math.sqrt(x*x + y*y)
        disArr.push(distance)
        totalDis += distance
      })
      // 计算时间
      disArr.forEach((distance)=>{
        let duration = distance/totalDis*AREA_ANIMATION_DURATION
        duration = duration
        durations.push(duration)
      })
      var paths = [toRaw(this.planningArea[0])]
      var movingPoint = {
            x: toRaw(this.planningArea[0][0]),
            y: toRaw(this.planningArea[0][1]),
          }
      var paths = [toRaw(this.planningArea[0])]
      let timeLine = anime.timeline({
        update: () => {
          if (paths.length) {
            var newPaths = [paths.concat([[movingPoint.x, movingPoint.y]])]
            toRaw(this.maskPolyline).geometry = {
              type: "polyline",
              paths: newPaths,
              spatialReference: SpatialReference.WebMercator,
            }
          }
        }
      })
      points.forEach((point,index)=>{
        timeLine = timeLine.add({
          targets: movingPoint,
          easing: "easeInOutCubic",
          duration: durations[index],
          x: point[0],
          y: point[1],
          complete: () => {
            paths.push([movingPoint.x, movingPoint.y])
          },
        })
      })
      return timeLine.finished
    },
    maskAnimation() {
      const MASK_ANIMATION_DURATION = 1000
      const maskColor = new Color([226, 119, 40, 0])
      const buildColor = new Color([256, 256, 256])
      let timeLine = anime.timeline({
        update: ()=>{
          toRaw(this.maskGraphic).symbol = this.polygonSymbolFunc(maskColor)
          this.disJointBuilding()
        }
      }).add({
        targets: [maskColor, buildColor],
        easing: "easeInOutCubic",
        duration: MASK_ANIMATION_DURATION,
        r: 226,
        g: 119,
        b: 40,
        a: 0.6
      }).add({
        targets: [maskColor, buildColor],
        easing: "easeInOutCubic",
        duration: MASK_ANIMATION_DURATION,
        delay: 300,
        endDelay: 1500,
        a: 0,
        complete: ()=>{
          toRaw(this.maskPolyline).geometry = toRaw(this.EMPTY_LINE)
        }
      })
      return timeLine.finished
    },
    disJointBuilding() {
      var promise  = new Promise((resolve)=>{
        var sceneLayer = toRaw(this.map).layers.find((layer) => layer.type === "scene")
        toRaw(this.view).whenLayerView(sceneLayer).then((lv)=>{
          // 创建sceneViewLayer
          let layerView = lv
          // 过滤area上的要素
          layerView.filter = new FeatureFilter({
            spatialRelationship: 'disjoint',
            geometry: toRaw(this.maskPolygon)
          })
          resolve()
        })
      })
      return promise
    },
    startPlan() {
      this.switchViewPort('Shore')
      toRaw(this.vectorLayer).visible = true
    },
    switchViewPort(vpId) {
      var slides = toRaw(this.map).presentation.slides
      var tempVP = toRaw(slides.getItemAt(0))
      slides.forEach((item)=>{
        if (item.title.text == vpId) {
          tempVP = item
        }
      })
      return toRaw(this.view).goTo(tempVP.viewpoint)
    },
    createPolygon(polygonSymbol) {
      const sketchViewModel = new SketchViewModel({
        view: toRaw(this.view),
        layer: toRaw(this.sketchLayer),
        polygonSymbol,
        updateOnGraphicClick: false
      })
      const _this = this
      sketchViewModel.on("create", function(event) {
        if (event.state === "complete") {
          toRaw(_this.sketchLayer).add(event.graphic)
          _this.$store.commit('switchGeoId', '')
          _this.$store.commit('switchCurrentOperation',false)
        }
      });
      sketchViewModel.create('polygon')
      this.$store.commit('switchCurrentOperation',true)

    },
    createPolyline(polylineSymbol) {
      const sketchViewModel = new SketchViewModel({
        view: toRaw(this.view),
        layer: toRaw(this.sketchLayer),
        polylineSymbol,
        updateOnGraphicClick: false
      })
      const _this = this
      sketchViewModel.on("create", function(event) {
        if (event.state === "complete") {
          toRaw(_this.sketchLayer).add(event.graphic)
          _this.$store.commit('switchCurrentOperation',false)
        }
      });
      sketchViewModel.create('polyline')
      _this.$store.commit('switchCurrentOperation',true)
    },
    createPoint(pointSymbol) {
      const sketchViewModel = new SketchViewModel({
        view: toRaw(this.view),
        layer: toRaw(this.sketchLayer),
        pointSymbol,
        updateOnGraphicClick: false
      })
      const _this = this
      sketchViewModel.on("create", function(event) {
        if (event.state === "complete") {
          toRaw(_this.sketchLayer).add(event.graphic)

        }
      });
      sketchViewModel.create('point')
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
