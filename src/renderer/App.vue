<template>
  <div id="app">
    <article class="container">
      <div class="page-container">
        <!-- <router-view></router-view> -->
        <object data="http://www.dairiki.org/tides/monthly.php/sea" type="text/html" style="width:100%; height:100%;"></object>
      </div>
      <div class="controls-container">
        <p>Some controls here!</p>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'scrapifier'
  }
</script>

<style lang="scss">
  article.container {
    display: flex;

    .page-container {
      flex: 3 0 auto;
    }

    .controls-container {
      flex: 1 0 auto;
    }
  }
</style>
