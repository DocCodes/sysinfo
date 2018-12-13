/* global $ */
const { ipcRenderer } = require('electron')
ipcRenderer.send('ipcReady') // Send back a ready signal
pendingSection()
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
    pendingSection()
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

function pendingSection () {
  $('main').html('<div class="w-100 h-100 d-flex"><img src="images/loading.svg" class="loading w-10"></div>')
}

function displaySection (sect) {
  $('main').html('')
  if (sect === 'Processor') {
    displayProcessor()
  } else if (sect === 'Storage') {
    displayStorage()
  }
}
// </region>

// <region> Secion Spawners
function displayProcessor () {
  $('main').append(`
    <div>
      <h5>Processor</h5>
      <div class="form-group row">
        <label class="col-2 col-form-label">Processor</label>
        <div class="col-10">
          <input type="text" readonly class="form-control" value="${window.infoCPU.brand}">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-2 col-form-label">Manufacturer</label>
        <div class="col-4">
          <input type="text" readonly class="form-control" value="${window.infoCPU.manufacturer}">
        </div>
        <label class="col-2 col-form-label">Vendor</label>
        <div class="col-4">
          <input type="text" readonly class="form-control" value="${window.infoCPU.vendor}">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-2 col-form-label">Family</label>
        <div class="col-2">
          <input type="text" readonly class="form-control" value="${window.infoCPU.family}">
        </div>
        <label class="col-2 col-form-label">Model</label>
        <div class="col-2">
          <input type="text" readonly class="form-control" value="${window.infoCPU.model}">
        </div>
          <label class="col-2 col-form-label">Stepping</label>
        <div class="col-2">
          <input type="text" readonly class="form-control" value="${window.infoCPU.stepping}">
        </div>
      </div>
    </div>
    <hr>

    <div class="row">
      <div class="col-4">
        <h5>Clocks</h5>
        <div class="form-group row">
          <label class="col-5 col-form-label">Max Clock</label>
            <div class="col-7">
              <input type="text" readonly class="form-control" value="${window.infoCPUSpeed.max} GHz">
            </div>
        </div>
        <div class="form-group row">
          <label class="col-5 col-form-label">Avg. Clock</label>
          <div class="col-7">
            <input type="text" readonly class="form-control" value="${window.infoCPUSpeed.avg} GHz">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-5 col-form-label">Min Clock</label>
          <div class="col-7">
            <input type="text" readonly class="form-control" value="${window.infoCPUSpeed.min} GHz">
          </div>
        </div>
      </div>
      <div class="col-8">
        <h5>Cache</h5>
        <div class="form-group row">
          <label class="col-3 col-form-label">L1 Data</label>
          <div class="col-6">
            <input type="text" readonly class="form-control" value="${formatBytes(window.infoCPU.cache.l1d)}">
          </div>
          <div class="col-3">
            <input type="text" readonly class="form-control" value="${window.infoCPU.cores}-way">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-3 col-form-label">L1 Inst.</label>
          <div class="col-6">
            <input type="text" readonly class="form-control" value="${formatBytes(window.infoCPU.cache.l1i)}">
          </div>
          <div class="col-3">
            <input type="text" readonly class="form-control" value="${window.infoCPU.cores}-way">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-3 col-form-label">L2 Cache</label>
          <div class="col-6">
            <input type="text" readonly class="form-control" value="${formatBytes(window.infoCPU.cache.l2)}">
          </div>
          <div class="col-3">
            <input type="text" readonly class="form-control" value="${window.infoCPU.cores}-way">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-3 col-form-label">L3 Cache</label>
          <div class="col-6">
            <input type="text" readonly class="form-control" value="${formatBytes(window.infoCPU.cache.l3)}">
          </div>
          <div class="col-3">
            <input type="text" readonly class="form-control" value="${window.infoCPU.cores * 2}-way">
          </div>
        </div>
      </div>
    </div>
  `)
}
function displayStorage () {
  let add = ''
  for (let d of window.infoStorage) {
    add += `
    <div>
      <h5>${d.mount}</h5>
      <div class="row">
        <div class="col-4">
          <div class="form-group row">
            <label class="col-5 col-form-label">System</label>
            <div class="col-7">
              <input type="text" readonly class="form-control" value="${d.fs}">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-5 col-form-label">Type</label>
            <div class="col-7">
              <input type="text" readonly class="form-control" value="${d.type}">
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="form-group row">
            <label class="col-2 col-form-label">Size</label>
            <div class="col-10">
              <input type="text" readonly class="form-control" value="${formatBytes(d.size)}">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-2 col-form-label">Used</label>
            <div class="col-10">
              <input type="text" readonly class="form-control" value="${formatBytes(d.used)}">
            </div>
          </div>
        </div>
      </div>
      <div class="progress" style="height: 8px;">
        <div class="progress-bar" role="progressbar" aria-valuenow="${d.use.toFixed(0)}" aria-valuemin="0" aria-valuemax="100" style="width: ${d.use}%"></div>
      </div>
    </div>
    `
    if (d !== window.infoStorage[window.infoStorage.length - 1]) { add += `<hr>` }
  }
  $('main').append(add)
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
