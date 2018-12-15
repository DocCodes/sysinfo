const appConfig = require('application-config')('SysInfo')
const path = require('path')
const pkg = require('./package.json')

const APP_NAME = 'SysInfo'
const APP_TEAM = pkg.author
const APP_VERSION = pkg.version

module.exports = {
  APP_COPYRIGHT: `Copyright © 2018 ${APP_TEAM}`,
  APP_NAME: APP_NAME,
  APP_TEAM: APP_TEAM,
  APP_VERSION: APP_VERSION,
  APP_WINDOW_TITLE: APP_NAME,
  APP_ICON: process.platform === 'win32'
    ? path.join(__dirname, 'assets', 'icons', 'png', '1024x1024.png')
    : path.join(__dirname, 'assets', 'icons', 'win', 'icon.ico'),

  CONFIG_PATH: path.dirname(appConfig.filePath),

  ABOUT_URL: pkg.homepage,
  GITHUB_URL: pkg.repository.url,
  GITHUB_URL_NEW_ISSUE: `${pkg.buds}/new`,
  GITHUB_URL_ISSUES: pkg.bugs.url,

  ROOT_PATH: __dirname,

  WINDOW_ABOUT: `file://${path.join(__dirname, 'renderer', 'about.html')}`,
  WINDOW_MAIN: `file://${path.join(__dirname, 'renderer', 'index.html')}`,
  WINDOW_WIDTH: 800,
  WINDOW_HEIGHT: 600
}
