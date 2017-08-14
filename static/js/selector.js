const ipcRenderer = require('electron').ipcRenderer

var hasScraped = false

function startScraping () {
  document.addEventListener('mousemove', (event) => {
    const x = event.clientX
    const y = event.clientY
    var element = document.elementFromPoint(x, y)

    $('.selector-hover').each(removeHover)
    addHover($(element))
  })
}

function addHover ($element) {
  $element.addClass('selector-hover')
  $element.on('click', function (event) {
    var selector = getSelector($(event.currentTarget))

    ipcRenderer.send('highlight-select', selector)
    event.preventDefault()
  })
}

function removeHover () {
  $(this).removeClass('selector-hover')
  $(this).off('click')
}

function getSelector ($el) {
  const element = $el.get(0).tagName.toLowerCase()
  const classes = '.' + $el.attr('class').split(' ').join('.').replace('.selector-hover', '')

  return element + classes
}