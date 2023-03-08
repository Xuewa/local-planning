<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['beforeScreenShot','afterScreenShot']),
  },
  watch: {
    beforeScreenShot(newScreenShot){
      console.log(newScreenShot)
      if (newScreenShot) {
        this.generateCanvas()
      }
    } 
  },
  updated(){
    

   
  },
  methods:{
    generateCanvas(){
      const before = this.beforeScreenShot
      const after = this.afterScreenShot
      if (before&&before.data&&after&&after.data) {
        console.log(this.beforeScreenShot)
        const canvas = document.getElementById("screenshotCanvas");
        const context = canvas.getContext("2d");
        const height = canvas.width = canvas.height = Math.min(before.data.width, 2 * before.data.height);
        const x = -(before.data.width - height) / 2;
        const dirtyY = (before.data.height - height / 2) / 2;
        context.putImageData(before.data, x, -dirtyY, 0, dirtyY, before.data.width, height / 2);
        context.putImageData(after.data, x, height / 2 - dirtyY, 0, dirtyY, after.data.width, height / 2);
        context.font = "bold 50px Helvetica";
        context.fillStyle = "white";
        context.fillText("Now", 15, height / 2 - 22);
        context.fillText("My Plan", 15, height - 22);
      }
    },
    back() {
      this.$store.commit('switchBeforeScreenShot', undefined)
      this.$store.commit('switchAfterScreenShot', undefined)
    },
    download() {
      const filename = "ParticipatoryPlanning.png";
      const canvas = document.getElementById("screenshotCanvas");
      const dataUrl = canvas.toDataURL("image/png");

      // Taken from https://developers.arcgis.com/javascript/latest/sample-code/sceneview-screenshot/index.html
      // the download is handled differently in Microsoft browsers
      // because the download attribute for <a> elements is not supported
      if (!window.navigator.msSaveOrOpenBlob) {
        // in browsers that support the download attribute
        // a link is created and a programmatic click will trigger the download
        const element = document.createElement("a");
        element.setAttribute("href", dataUrl);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        // for MS browsers convert dataUrl to Blob
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // download file
        window.navigator.msSaveOrOpenBlob(blob, filename);
      }
    }
  }
}

</script>

<template>
  <div id="screenShot" v-show="beforeScreenShot&&afterScreenShot">
    <div class="masker"></div>
    <div class="btns-wrp">
      <button @click="back">返回</button>
      <button @click="download">下载</button>
    </div>
    <canvas id="screenshotCanvas" ></canvas>
  </div>
  
</template>

<style scoped lang="scss">
  #screenShot{
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    .masker{
      position: absolute;
      top: 0;
      bottom:0;
      left: 0;
      right: 0;
      background-color: rgba($color: #000000, $alpha: 0.7);
    }
    button{
      position: absolute;
      top: 50%;
      &:first-child{
        left: 40px;
      }
      &:last-child{
        right: 40px;
      }
    }
    canvas{
      position: absolute;
      top: 20px;
      width: 60%;
      height: 60%;
      left: 18%;
      top: 15%;
    }
  }
</style>
