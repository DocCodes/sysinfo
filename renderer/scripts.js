/* global $, Baseboard, Cache, ClockSpeed, GraphicsDevice, Memory, OperatingSystem, Processor, StorageDevice, System */
const { ipcRenderer } = require('electron')
ipcRenderer.send('ipcReady') // Send back a ready signal
ipcRenderer.send('getComputer')

// <region> Events
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
    $('#loader').addClass('loading').attr('src', 'images/loading.svg')
  } else {
    displaySection(dataTgt)
  }
})

$('#loader').click(reloadSection)
// </region>

// <region> Section Masters
function reloadSection () {
  let dataTgt = $('.nav-link.active').get(0).dataset.tab
  let cmdGet = `get${dataTgt}`
  window[cmdGet] = false
  $('.nav-link.active').click()
}

function displaySection (sect) {
  $('main').html('')
  $('#loader').removeClass('loading').attr('src', 'images/reload.svg')
  switch (sect) {
    case 'Computer':
      displayComputer()
      break
    case 'Processor':
      displayProcessor()
      break
    case 'Graphics':
      displayGraphics()
      break
    case 'Memory':
      displayMemory()
      break
    case 'Storage':
      displayStorage()
      break
  }
}
// </region>

// <region> Secion Spawners
function displayComputer () {
  $('main').append(System(window.infoSystem))
  $('main').append(OperatingSystem(window.infoOS))
  $('main').append(Baseboard(window.infoBaseboard))
}
function displayProcessor () {
  $('main').append(`
    ${Processor(window.infoCPU)}

    <div class="row">
      ${ClockSpeed(window.infoCPUSpeed)}
      ${Cache(window.infoCPU)}
    </div>
  `)
}
function displayGraphics () {
  let i = 1
  for (let d of window.infoGraphics.controllers) {
    $('main').append(GraphicsDevice(d, i++))
    if (d !== window.infoGraphics.controllers[window.infoGraphics.controllers.length - 1]) { $('main').append('<hr>') }
  }
}
function displayMemory () {
  let i = 1
  for (let m of window.infoMemory) {
    $('main').append(Memory(m, i++))
    if (m !== window.infoMemory[window.infoMemory.length - 1]) { $('main').append('<hr>') }
  }
}
function displayStorage () {
  for (let d of window.infoStorage) {
    if (!d.type) { continue }
    $('main').append(StorageDevice(d))
    if (d !== window.infoStorage[window.infoStorage.length - 1]) { $('main').append('<hr>') }
  }
}
// </region>

// <region> Utilities
function formatBytes (bytes, decimals) {
  if (bytes === 0) return '0 Bytes'
  let k = 1024
  let dm = decimals <= 0 ? 0 : decimals || 2
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
// </region>
