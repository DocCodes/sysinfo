const about = module.exports = {
  init,
  win: null
}

const config = require('../config')
const electron = require('electron')

function init () {
  if (about.win) {
    return about.win.show()
  }

  const win = about.win = new electron.BrowserWindow({
    backgroundColor: '#ECECEC',
    center: true,
    fullscreen: false,
    height: 200,
    icon: config.APP_ICON,
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    skipTaskbar: true,
    title: `About ${config.APP_WINDOW_TITLE}`,
    useContentSize: true,
    width: 300
  })

  win.loadURL(config.WINDOW_ABOUT)

  win.setMenu(null)

  win.once('ready-to-show', function () {
    win.show()
  })

  win.once('closed', function () {
    about.win = null
  })
}
