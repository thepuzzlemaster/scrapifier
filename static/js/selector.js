const ipcRenderer = require('electron').ipcRenderer

var hasScraped = false
var currentSelector = ''

function startScraping (incomingSelector) {
  currentSelector = incomingSelector || ''
  addHighlight(null, null, currentSelector)
  document.addEventListener('mousemove', moveHandler = event => {
    const x = event.clientX
    const y = event.clientY
    var element = document.elementFromPoint(x, y)

    addHighlight($(element), event)
  })
}

// -------------------------------------------------------------------------
// HIGHLIGHTING FUNCTIONS
//
function addHighlight ($element, moveEvent, selector, showAppend) {
  const selectorIsEmpty = selector === ''
  selector = selectorIsEmpty ? '' : selector || getSelector($(moveEvent.target))

  // Remove existing hovers
  $('.selector-hover').each(removeHighlight)

  if ($element) {
    $element.addClass('selector-hover hover-primary')
    $element.removeClass('hover-secondary')
    $element.on('click', function (event) {
      document.removeEventListener('mousemove', moveHandler)
      event.preventDefault()
      $element.removeClass('hover-primary')
      ipcRenderer.send('selector-click', {
        selector: selector
      })
    })
  }

  $(selector).addClass('selector-hover hover-secondary')
  ipcRenderer.send('selector-info', {
    count: $(selector).length,
    selector: selector,
    showAppend: showAppend
  })
}

function removeHighlight () {
  $(this).removeClass('selector-hover')
  $(this).removeClass('hover-primary')
  $(this).removeClass('hover-secondary')
  $(this).off('click')
}

// -------------------------------------------------------------------------
// EXTRACT DATA FUNCTIONS
//
function extractData () {
  $('body').append('<div class="lightbox"></div>')
}

// -------------------------------------------------------------------------
// EVENT HANDLERS
//
ipcRenderer.on('selector-updated', (event, selector) => {
  addHighlight(null, null, selector, true)
})

ipcRenderer.on('extract-data', (event, selector) => {
  console.log('extract-data')
  extractData()
})

// -------------------------------------------------------------------------
// HELPER METHODS
//
function getSelector ($el) {
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
    selector = selector.replace(/^\,\s*|\,\s*$/, '')
    return selector
  }

  const $parent = $el.parent()
  const elSelector = getSelectorString($el)
  const parentSelector = getSelectorString($parent)

  var returnSelector = `${currentSelector}, ${parentSelector} ${elSelector}`
  return stripWhitespace(returnSelector)
}