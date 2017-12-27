<template>
  <div id="app">
    <div class="container">
      <!-- <div id="page-container"> -->
        <!-- <object id="external-page" :data="url" type="text/html" style="width:100%; height:100%;"></object> -->
      <!-- </div> -->
      <!-- <router-view :url="url"></router-view> -->
      <web-content :url="url"
                   v-on:selectorInfo="selectorInfo"
                   v-on:selectorClick="selectorClick"></web-content>
      <controls class="controls" :count="count"
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
  import { mapState } from 'vuex'

  // import axios from 'axios'
  // import cheerio from 'cheerio'

  export default {
    name: 'scrapifier',
    components: { Controls, WebContent },
    data: function () {
      return {
        url: 'http://localhost:8889/www.dairiki.org/tides/monthly.php/sea',
        count: 0,
        selector: '',
        showAppend: false
      }
    },
    computed: mapState({
      scraping: state => state.ScrapingData.scraping
    }),
    methods: {
      startScraping: function (isScraping, options) {
        console.log('App.startScraping', isScraping, options)
        var scrapingMode = options && options.mode
        var selector = options && options.selector
        this.$store.commit('setScraping', isScraping)
        this.$store.commit('setScrapingMode', scrapingMode)
        this.$store.commit('setSelector', selector)
        this.showAppend = !isScraping
      },
      selectorInfo: function (options) {
        this.count = options.count
        this.scraping.selector = options.selector
        this.showAppend = options.showAppend
      },
      selectorClick: function (options) {
        this.showAppend = true
        this.scraping.isScraping = false
        this.scraping.selector = options && options.selector
      },
      setSelector: function (options) {
        this.showAppend = true
        this.scraping.selector = options.selector
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
