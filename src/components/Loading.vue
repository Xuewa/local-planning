<script >
export default {
  props: {
    loadingshow: Boolean
  },
  created() {
    console.log(this.loadingshow)
  }
}

</script>

<template>
  <div class="loading-wrp" v-show="loadingshow">
    <div class="masker"></div>
    <div class="loading">
      <!-- loader-bar用的原来的css -->
      <div class="loader-bars"></div>
      <div class="loading-txt">Loading...</div>
    </div>
  </div>
  
</template>

<style scoped lang="scss">
  .loading-wrp{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .masker{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba($color: #333, $alpha: .7);
  }
  .loading{
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    top: 50%;
    margin-top: -50px;
    .loading-txt{
      position: absolute;
      bottom: 16px;
      color: #fff;
    }
  }


</style>
