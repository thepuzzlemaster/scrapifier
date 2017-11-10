<template>
  <div v-html="html"></div>
</template>

<script>
  import cheerio from 'cheerio'
  var existingHeadHtml = ''

  export default {
    name: 'selector',
    props: ['url'],
    data: function () {
      return {
        html: '<p>Loading...</p>'
      }
    },
    methods: {
    },
    mounted: function () {
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
    }
  }
</script>

<style lang="scss">
</style>
