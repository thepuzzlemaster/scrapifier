<template>
  <div v-html="html"></div>
</template>

<script>
  import cheerio from 'cheerio'

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
      this.$http.get(this.url).then(response => {
        const $ = cheerio.load(response.data)
        this.html = $('body').html()
      }).catch((error) => {
        console.log('error loading url', error)
      })
    }
  }
</script>

<style lang="scss">
</style>
