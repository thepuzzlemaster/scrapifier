<template>
  <div id="app">
    <div class="container">
      <!-- <div id="page-container"> -->
        <!-- <object id="external-page" :data="url" type="text/html" style="width:100%; height:100%;"></object> -->
      <!-- </div> -->
      <!-- <router-view :url="url"></router-view> -->
      <web-content :url="url"
                   :scraping="scraping"
                   v-on:selectorInfo="selectorInfo"
                   v-on:selectorClick="selectorClick"></web-content>
      <controls class="controls" :count="count"
                                 :selector="scraping.selector"
                                 :show-append="showAppend"
                                 :url="url"
                                 v-on:selectorChange="setSelector"
                                 v-on:isScraping="startScraping"></controls>
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
        url: 'http://localhost:8889/www.dairiki.org/tides/monthly.php/sea',
        scraping: {
          isScraping: false,
          scrapingMode: null,
          selector: ''
        },
        count: 0,
        selector: '',
        showAppend: false
      }
    },
    methods: {
      startScraping: function (isScraping, options) {
        // console.log('App.startScraping', isScraping, options)
        var scrapingMode = options && options.mode
        var selector = options && options.selector
        var scrapingObject = {
          isScraping: isScraping,
          scrapingMode: scrapingMode,
          selector: selector
        }

        this.scraping = scrapingObject
        this.showAppend = false
      },
      selectorInfo: function (options) {
        this.count = options.count
        this.scraping.selector = options.selector
        this.showAppend = options.showAppend
      },
      selectorClick: function (options) {
        this.showAppend = true
        this.scraping.selector = options && options.selector
      },
      setSelector: function (options) {
        this.showAppend = true
        this.scraping.selector = options.selectorInfo
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
