'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let window
let browserPageWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  window = new BrowserWindow({
    height: 750,
    useContentSize: true,
    width: 1000,
    x: 0,
    y: 0
  })

  window.loadURL(winURL + 'controls')

  window.on('closed', () => {
    window = null
  })

  // -------------------------------------------------------------------------
  // Events from selector.js
  //
  ipcMain.on('selector-info', (event, selectorInfo) => {
    window.webContents.send('selector-info', selectorInfo)
  })

  ipcMain.on('selector-click', (event, selectorInfo) => {
    window.webContents.send('selector-click')
  })

  // -------------------------------------------------------------------------
  // Events from Controls.vue
  //
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
  if (window === null) {
    createWindow()
  }
})
