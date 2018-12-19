/* global formatBytes */
function Disk (d, i) {
  return `<div>
    <h5>Disk ${i}</h5>
    <div class="form-group row">
      <label class="col-2 col-form-label">Model</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${d.name}">
      </div>
      <label class="col-2 col-form-label">Serial</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${d.serialNum}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Size</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${formatBytes(d.size)}">
      </div>
      <label class="col-2 col-form-label">Type</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${d.type}">
      </div>
      <label class="col-2 col-form-label">Interface</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${d.interfaceType}">
      </div>
    </div>
  </div>`
}

module.exports = {
  Disk: Disk
}
