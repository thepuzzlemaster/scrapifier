const ipcRenderer = require('electron').ipcRenderer

var hasScraped = false

function startScraping () {
  document.addEventListener('mousemove', moveHandler = event => {
    const x = event.clientX
    const y = event.clientY
    var element = document.elementFromPoint(x, y)

    $('.selector-hover').each(removeHover)
    addHover($(element), event)
  })
}

function addHover ($element, moveEvent, selector) {
  selector = selector || getSelector($(moveEvent.target))

  if ($element) {
    $element.addClass('selector-hover hover-primary')
    $element.removeClass('hover-secondary')
    $element.on('click', function (event) {
      ipcRenderer.send('highlight-select', selector)
      document.removeEventListener('mousemove', moveHandler)
      event.preventDefault()
    })
  }
  
  $(selector).addClass('selector-hover hover-secondary')
}

ipcRenderer.on('selector-updated', (event, selector) => {
  addHover(null, null, selector)
})

function removeHover () {
  $(this).removeClass('selector-hover')
  $(this).removeClass('hover-primary')
  $(this).removeClass('hover-secondary')
  $(this).off('click')
}

function getSelector ($el) {
  function getTag ($el) {
    return $el.get(0).tagName.toLowerCase()
  }

  function getClasses ($el) {
    let classes = ''
    
    if ($el.attr('class')) {
      classes = '.' + $el.attr('class').split(' ').join('.').replace('.selector-hover', '')
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

  const $parent = $el.parent()
  const elSelector = getSelectorString($el)
  const parentSelector = getSelectorString($parent)
  
  return `${parentSelector} ${elSelector}`
}