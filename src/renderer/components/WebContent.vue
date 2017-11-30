<template>
  <div class="web-content" v-html="html"></div>
</template>

<script>
  import cheerio from 'cheerio'
  import $ from 'jquery'

  var existingHeadHtml = ''

  export default {
    name: 'webContent',
    props: {
      url: String,
      scraping: Object
    },
    data: function () {
      return {
        html: '<p>Loading...</p>',
        currentSelector: ''
      }
    },
    watch: {
      scraping: function (newVal) {
        // console.log('watch scraping', newVal)
        if (newVal.isScraping) {
          this.startScraping(newVal.selector)
        }
      }
    },
    methods: {
      startScraping: function (incomingSelector) {
        // console.log('WebContent.startScraping', incomingSelector)
        this.currentSelector = incomingSelector || ''
        this.addHighlight(null, null, this.currentSelector)
        document.addEventListener('mousemove', this.moveHandler)
      },

      //
      // HIGHLIGHT METHODS
      addHighlight: function ($element, moveEvent, selector, showAppend) {
        function removeHighlight () {
          $(this).removeClass('selector-hover')
          $(this).removeClass('hover-primary')
          $(this).removeClass('hover-secondary')
          $(this).off('click')
        }
        const selectorIsEmpty = selector === ''
        selector = selectorIsEmpty ? '' : selector || this.getSelector($(moveEvent.target))

        // Remove existing hovers
        $('.selector-hover').each(removeHighlight)

        if ($element) {
          $element.addClass('selector-hover hover-primary')
          $element.removeClass('hover-secondary')
          $element.on('click', (event) => {
            document.removeEventListener('mousemove', this.moveHandler)
            event.preventDefault()
            $element.removeClass('hover-primary')
            this.$emit('selectorClick', {
              selector: selector
            })
          })
        }

        $(selector).addClass('selector-hover hover-secondary')
        this.$emit('selectorInfo', {
          count: $(selector).length,
          selector: selector,
          showAppend: showAppend
        })
      },

      //
      // EVENT HANDLERS
      moveHandler: function (event) {
        const x = event.clientX
        const y = event.clientY
        var element = document.elementFromPoint(x, y)

        this.addHighlight($(element), event)
      },

      //
      // HELPER METHODS
      getSelector: function ($el) {
        function getTag ($el) {
          return $el.get(0).tagName.toLowerCase()
        }

        function getClasses ($el) {
          let classes = ''
          function stripHoverClasses (classes) {
            return classes.replace('.selector-hover', '')
              .replace('.hover-primary', '')
              .replace('.hover-secondary', '')
          }

          if ($el.attr('class')) {
            classes = '.' + $el.attr('class').split(' ').join('.')
            classes = stripHoverClasses(classes)
          }

          return classes
        }

        function getSelectorString ($el) {
          const tag = getTag($el)
          const classes = getClasses($el)

          if (tag !== 'html' && tag !== 'body') {
            return tag + classes
          }

          return ''
        }

        function stripWhitespace (selector) {
          // Strip out leading and trailing commas and spaces
          selector = selector.replace(/^,\s*|,\s*$/, '')
          return selector
        }

        const $parent = $el.parent()
        const elSelector = getSelectorString($el)
        const parentSelector = getSelectorString($parent)

        var returnSelector = `${this.currentSelector}, ${parentSelector} ${elSelector}`
        return stripWhitespace(returnSelector)
      }
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

      // this.$electron.ipcRenderer.on('selector-updated', (event, selector) => {
      //   WebContent.addHighlight(null, null, selector, true)
      // })

      // this.$electron.ipcRenderer.on('extract-data', (event, selector) => {
      //   WebContent.extractData()
      // })
    }
  }
</script>

<style lang="scss">
  @import "../../scss/web-content";
</style>
