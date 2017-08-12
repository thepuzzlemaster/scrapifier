console.log('selector?')

function startScraping () {
  document.addEventListener('mousemove', (event) => {
    const x = event.clientX
    const y = event.clientY
    var element = document.elementFromPoint(x, y)

    $('.selector-hover').removeClass('selector-hover')
    $(element).addClass('selector-hover')
  })
}