<template>
  <div id="app">
    <div class="container">
      <!-- <div id="page-container"> -->
        <!-- <object id="external-page" :data="url" type="text/html" style="width:100%; height:100%;"></object> -->
      <!-- </div> -->
      <!-- <router-view :url="url"></router-view> -->
      <web-content :url="url"></web-content>
      <controls class="controls" :url="url"></controls>
    </div>
  </div>
</template>

<script>
  import Controls from './components/Controls'
  import WebContent from './components/WebContent'

  // import axios from 'axios'
  // import cheerio from 'cheerio'

  export default {
    name: 'scrapifier',
    components: { Controls, WebContent },
    data: function () {
      return {
        url: 'http://localhost:8889/www.dairiki.org/tides/monthly.php/sea'
      }
    },
    mounted: function () {
      // axios.get(this.url).then((response) => {
        // const $ = cheerio.load(response.data)
        // console.log($('table').html())
        // document.getElementById('page-container').innerHTML = $('body')
        // console.log($('body').html())
      // }).catch((error) => {
        // console.log('error loading url', error)
      // })
    }
  }
</script>

<style lang="scss">
  @import "../scss/styles";
  @import "../scss/font-awesome/font-awesome";

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    height: 100vh;

    .web-content {
      width: 75%;
    }
  }
</style>
