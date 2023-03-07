<script>
export default {
  
  methods:{
    
  }
}

</script>

<template>
  <div id="screenShot" >
    <div class="masker"></div>
    <div class="btns-wrp">
      <button>返回</button>
      <button>下载</button>
    </div>
    <canvas id="screenshotCanvas"></canvas>
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
    }
  }
</style>
