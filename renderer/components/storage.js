/* global formatBytes */
function StorageDevice (d) {
  if (!d.type) { return }
  return `<div>
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
}

module.exports = {
  StorageDevice: StorageDevice
}
