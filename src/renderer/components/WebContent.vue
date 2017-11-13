<template>
  <div v-html="html"></div>
</template>

<script>
  import cheerio from 'cheerio'
  import WebContent from './WebContent/webContent'

  var existingHeadHtml = ''

  export default {
    name: 'webContent',
    props: ['url'],
    data: function () {
      return {
        html: '<p>Loading...</p>'
      }
    },
    methods: {
    },
    mounted: function () {
      // Load external HTML and add to page
      console.log('http request: ', this.url)
      existingHeadHtml = document.getElementsByTagName('head')[0].innerHTML
      this.$http.get(this.url).then(response => {
        const $ = cheerio.load(response.data)
        const bodyHtml = $('body').html()
        this.html = bodyHtml
        const headHtml = $('head').html()
        document.getElementsByTagName('head')[0].innerHTML = existingHeadHtml + headHtml
      }).catch((error) => {
        console.log('error loading url', error)
      })

      this.$electron.ipcRenderer.on('hover-init', (event, selectorInfo) => {
        const selector = (selectorInfo && selectorInfo.selector) || ''
        WebContent.startScraping(selector)
      })

      this.$electron.ipcRenderer.on('selector-updated', (event, selector) => {
        WebContent.addHighlight(null, null, selector, true)
      })

      this.$electron.ipcRenderer.on('extract-data', (event, selector) => {
        WebContent.extractData()
      })
    }
  }
</script>

<style lang="scss">
  @import "../../scss/web-content";
</style>
