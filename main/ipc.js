module.exports = {
  init
}

const { app, ipcMain } = require('electron')
const main = require('./window')

async function init () {
  ipcMain.once('ipcReady', (e) => {
    app.ipcReady = true
    app.emit('ipcReady')
  })

  ipcMain.on('setProgress', (e, ...args) => main.setProgress(...args)) // Set task bar progress
  ipcMain.on('setTitle', (e, ...args) => main.setTitle(...args)) // Set the app title
  ipcMain.on('show', () => main.show()) // Show the main window
  ipcMain.on('getComputer', () => main.getComputer()) // Get computer information
  ipcMain.on('getProcessor', () => main.getProcessor()) // Get processor information
  ipcMain.on('getGraphics', () => main.getGraphics()) // Get graphics information
  ipcMain.on('getMemory', () => main.getMemory()) // Get memory information
  ipcMain.on('getStorage', () => main.getStorage()) // Get storage information
}
