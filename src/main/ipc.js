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
  ipcMain.on('getData', (e, ...args) => main.getData(args[0], ...args.slice(1))) // Get any information
}
