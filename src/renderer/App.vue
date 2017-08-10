<template>
  <div id="app">
    <div class="container">
      <div class="page-container">
        <!-- <router-view></router-view> -->
        <object data="http://www.dairiki.org/tides/monthly.php/sea" type="text/html" style="width:100%; height:100%;"></object>
      </div>
      <div class="controls-container">
        <p>Some controls here!</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'scrapifier'
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    height: 100vh;

    .page-container {
      flex: 3 0 auto;
    }

    .controls-container {
      flex: 1 0 auto;
    }
  }
</style>
