const ipcRenderer = require('electron').ipcRenderer

var hasScraped = false

function startScraping () {
  document.addEventListener('mousemove', (event) => {
    const x = event.clientX
    const y = event.clientY
    var element = document.elementFromPoint(x, y)

    $('.selector-hover').each(removeHover)
    addHover($(element), event)
  })
}

function addHover ($element, moveEvent) {
  const selector = getSelector($(moveEvent.target))

  $element.addClass('selector-hover hover-primary')
  $(selector).addClass('selector-hover hover-secondary')
  $element.removeClass('hover-secondary')
  $element.on('click', function (event) {
    event.preventDefault()
    ipcRenderer.send('highlight-select', selector)
  })
}

function removeHover () {
  $(this).removeClass('selector-hover')
  $(this).removeClass('hover-primary')
  $(this).removeClass('hover-secondary')
  $(this).off('click')
}

function getSelector ($el) {
  function getClasses () {
    var classes = ''
    if ($el.attr('class')) {
      classes = '.' + $el.attr('class').split(' ').join('.').replace('.selector-hover', '')
    }

    return classes
  }

  const element = $el.get(0).tagName.toLowerCase()
  const classes = getClasses()
  
  return element + classes
}