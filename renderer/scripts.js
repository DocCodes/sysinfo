/* global $, Baseboard, Cache, ClockSpeed, GraphicsDevice, Memory, OperatingSystem, Process, Processor, StorageDevice, System */
const { ipcRenderer } = require('electron')
ipcRenderer.send('ipcReady') // Send back a ready signal
ipcRenderer.send('getComputer')

// <region> Events
ipcRenderer.on('retData', (sender, success, parent, r) => {
  if (success) {
    window[`get${parent}`] = true
    window[`info${parent}`] = r
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
    case 'Processes':
      displayProcesses()
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
  let bank = window.infoComputer
  $('main').append(System(bank.system))
  $('main').append(OperatingSystem(bank.osInfo))
  $('main').append(Baseboard(bank.baseboard))
}
function displayProcesses () {
  let bank = window.infoProcesses
  $('main').append(`
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Usage (User)</th>
        <th scope="col">Usage (Sys)</th>
        <th scope="col">Started</th>
      </tr>
    </thead>
    <tbody></tbody>
    </table>
  `)
  for (let p of bank.processes.list) {
    $('main table tbody').append(Process(p))
  }
}
function displayProcessor () {
  let bank = window.infoProcessor
  $('main').append(`
    ${Processor(bank.cpu)}

    <div class="row">
      ${ClockSpeed(bank.cpuCurrentspeed)}
      ${Cache(bank.cpu)}
    </div>
  `)
}
function displayGraphics () {
  let bank = window.infoGraphics
  let i = 1
  for (let d of bank.graphics.controllers) {
    $('main').append(GraphicsDevice(d, i++))
    if (d !== bank.graphics.controllers[bank.graphics.controllers.length - 1]) { $('main').append('<hr>') }
  }
}
function displayMemory () {
  let bank = window.infoMemory
  let i = 1
  for (let m of bank.memLayout) {
    $('main').append(Memory(m, i++))
    if (m !== bank.memLayout[bank.memLayout.length - 1]) { $('main').append('<hr>') }
  }
}
function displayStorage () {
  let bank = window.infoStorage
  for (let d of bank.fsSize) {
    if (!d.type) { continue }
    $('main').append(StorageDevice(d))
    if (d !== bank.fsSize[bank.fsSize.length - 1]) { $('main').append('<hr>') }
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
module.exports = formatBytes
// </region>
