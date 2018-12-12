/* global $ */
const { ipcRenderer } = require('electron')
ipcRenderer.send('ipcReady') // Send back a ready signal
pendingSection()
ipcRenderer.send('getComputer')

ipcRenderer.on('retData', (sender, success, parent, subject, r) => {
  if (success) {
    window[`get${parent}`] = true
    window[`info${subject}`] = r
    displaySection(parent)
  } else {
    window[`get${parent}`] = false
  }
})

$('[data-tab]').click((ev) => {
  let dataTgt = ev.target.dataset.tab
  let cmdGet = `get${dataTgt}`
  $('.nav-link.active').removeClass('active')
  $(ev.target).addClass('active')

  if (window[cmdGet] !== true) {
    ipcRenderer.send(cmdGet)
    pendingSection()
  } else {
    displaySection(dataTgt)
  }
})

function reloadSection () {
  let dataTgt = $('.nav-link.active').get(0).dataset.tab
  let cmdGet = `get${dataTgt}`
  window[cmdGet] = false
  $('.nav-link.active').click()
}

function pendingSection () {
  $('main').html('<div class="w-100 h-100 d-flex"><img src="images/loading.svg" class="loading w-10"></div>')
}

function displaySection (sect) {
  $('main').html('')
}

function formatBytes (bytes, decimals) {
  if (bytes === 0) return '0 Bytes'
  let k = 1024
  let dm = decimals <= 0 ? 0 : decimals || 2
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
