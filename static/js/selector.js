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
    event.preventDefault()
    console.log('item clicked!!!')
  })
}

function removeHover () {
  $(this).removeClass('selector-hover')
  $(this).off('click')
}
