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
  ? `http://localhost:9080/#`
  : `file://${__dirname}/index.html`

function createWindow () {
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

  // browserPageWindow = new BrowserWindow({
  //   parent: controlsWindow,
  //   height: 750,
  //   frame: false,
  //   resizable: false,
  //   movable: false,
  //   useContentSize: true,
  //   width: 750,
  //   x: 0,
  //   y: 45
  // })

  controlsWindow.loadURL(winURL + 'controls')
  // browserPageWindow.loadURL(winURL)

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
    controlsWindow.webContents.send('selector-click')
  })

  // -------------------------------------------------------------------------
  // Events from Controls.vue
  //
  ipcMain.on('hover-init', (event, selectorInfo) => {
    browserPageWindow.focus()
    browserPageWindow.webContents.send('hover-init', selectorInfo)
  })

  ipcMain.on('selector-updated', (event, selector) => {
    browserPageWindow.webContents.send('selector-updated', selector)
  })

  ipcMain.on('extract-data', (event, selector) => {
    browserPageWindow.webContents.send('extract-data', selector)
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
