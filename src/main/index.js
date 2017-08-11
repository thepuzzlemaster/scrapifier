'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let childWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 750,
    useContentSize: true,
    width: 1000,
    x: 0,
    y: 0
  })

  childWindow = new BrowserWindow({
    parent: mainWindow,
    height: 750,
    frame: false,
    resizable: false,
    movable: false,
    useContentSize: true,
    width: 750,
    x: 0,
    y: 45
  })

  mainWindow.loadURL(winURL)
  childWindow.loadURL('http://www.dairiki.org/tides/monthly.php/sea')

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('select-element', (event, data) => {
    event.sender.send('pong', Math.random())
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
