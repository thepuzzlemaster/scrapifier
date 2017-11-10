'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let controlsWindow
let browserPageWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  let currentSelector = ''

  /**
   * Initial window options
   */
  controlsWindow = new BrowserWindow({
    height: 750,
    useContentSize: true,
    width: 1000,
    x: 0,
    y: 0
  })

  browserPageWindow = new BrowserWindow({
    parent: controlsWindow,
    height: 750,
    frame: false,
    resizable: false,
    movable: false,
    useContentSize: true,
    width: 750,
    x: 0,
    y: 45
  })

  controlsWindow.loadURL(winURL)
  browserPageWindow.loadURL('http://www.dairiki.org/tides/monthly.php/sea')

  controlsWindow.on('closed', () => {
    controlsWindow = null
  })

  // -------------------------------------------------------------------------
  // Events from selector.js
  //
  ipcMain.on('selector-info', (event, selectorInfo) => {
    controlsWindow.webContents.send('selector-info', selectorInfo)
  })

  ipcMain.on('selector-click', (event, selectorInfo) => {
    currentSelector = selectorInfo.selector
    controlsWindow.webContents.send('selector-click')
  })

  // -------------------------------------------------------------------------
  // Events from Controls.vue
  //
  ipcMain.on('hover-init', (event, selectorInfo) => {
    browserPageWindow.focus()

    browserPageWindow.webContents.executeJavaScript(`startScraping("${currentSelector}")`)
  })

  ipcMain.on('selector-updated', (event, selector) => {
    browserPageWindow.webContents.send('selector-updated', selector)
  })

  ipcMain.on('use-selector', (event, selector) => {
    console.log('use-selector', selector)
  })

  // Inject js and css to loaded website
  browserPageWindow.webContents.on('did-finish-load', () => {
    var js = `
    var script = document.createElement('script')
    var $script = document.createElement('script')
    var style = document.createElement('link')
    script.src = 'http://localhost:9080/static/js/selector.js'
    $script.src = 'http://localhost:9080/static/js/jquery-3.2.1.slim.min.js'
    style.href = 'http://localhost:9080/static/css/selector.css'
    style.rel='stylesheet'
    style.type='text/css'
    document.body.appendChild($script)
    document.body.appendChild(script)
    document.head.appendChild(style)
    `
    browserPageWindow.webContents.executeJavaScript(js)
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (controlsWindow === null) {
    createWindow()
  }
})
