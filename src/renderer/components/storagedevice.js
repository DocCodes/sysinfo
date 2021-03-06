/* global formatBytes */
function StorageDevice (d) {
  if (!d.type) { return }
  return `<div>
    <h5>${d.fs}</h5>
    <div class="row">
      <label class="col-sm-2 col-xl-1 col-form-label">Mount</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${d.mount}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Type</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${d.type}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Size</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${formatBytes(d.size)}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Used</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${formatBytes(d.used)}">
      </div>
    </div>
    <div class="progress" style="height: 8px;">
      <div class="progress-bar" role="progressbar" aria-valuenow="${d.use.toFixed(0)}" aria-valuemin="0" aria-valuemax="100" style="width: ${d.use}%"></div>
    </div>
  </div>
  `
}

module.exports = {
  StorageDevice: StorageDevice
}
