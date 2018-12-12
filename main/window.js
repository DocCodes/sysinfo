const main = module.exports = {
  init,
  send,
  setProgress,
  setTitle,
  show,
  toggleDevTools,
  getComputer,
  getProcessor,
  getGraphics,
  getStorage,
  win: null
}

const { BrowserWindow } = require('electron')
const config = require('../config')
const si = require('systeminformation')

async function init () {
  if (main.win) { return main.win.show() }
  var win = main.win = new BrowserWindow({
    backgroundColor: '#FFFFFF',
    darkTheme: false,
    icon: config.APP_ICON,
    resizable: false,
    width: config.WINDOW_WIDTH,
    height: config.WINDOW_HEIGHT,
    title: config.APP_WINDOW_TITLE,
    useContentSize: true,
    show: false
  })
  win.loadURL(config.WINDOW_MAIN)

  win.on('closed', () => {
    win = main.win = null
  })

  win.once('ready-to-show', () => {
    win.show()
  })
}

function send (...args) {
  if (!main.win) { return }
  main.win.send(...args)
}

function setProgress (progress) {
  if (!main.win) { return }
  main.win.setProgressBar(progress)
}

function setTitle (title) {
  if (!main.win) { return }
  main.win.setTitle(title)
}

function show () {
  if (!main.win) { return }
  main.win.show()
}

function toggleDevTools () {
  if (!main.win) { return }
  if (main.win.webContents.isDevToolsOpened()) {
    main.win.webContents.closeDevTools()
  } else {
    main.win.webContents.openDevTools({ mode: 'detach' })
  }
}

function getData (siInstance, pbInstance, parent) {
  si[siInstance]().then((r) => {
    main.win.webContents.send('retData', true, parent, pbInstance, r)
  }).catch((e) => {
    main.win.webContents.send('retData', false, parent, pbInstance, e)
  })
}

function getMultipartData (data, parent) {
  for (let k in data) {
    getData(k, data[k], parent)
  }
}

function getComputer () {
  getMultipartData({
    system: 'System',
    bios: 'Bios',
    baseboard: 'Motherboard',
    osInfo: 'OS'
  }, 'Computer')
}

function getProcessor () {
  getMultipartData({
    cpu: 'CPU',
    cpuCurrentspeed: 'CPUSpeed',
    cpuTemperature: 'CPUTemp',
    currentLoad: 'CPULoad'
  }, 'Processor')
}

function getGraphics () {
  getData('graphics', 'Graphics', 'Graphics')
}

function getStorage () {
  getData('fsSize', 'Storage', 'Storage')
}
