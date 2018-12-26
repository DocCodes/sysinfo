/* global formatBytes */
function Disk (d, i) {
  return `<div>
    <h5>Disk ${i}</h5>
    <div class="row">
      <label class="col-sm-2 col-xl-1 col-form-label">Model</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${d.name}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Serial</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${d.serialNum}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Size</label>
      <div class="col-sm-10 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${formatBytes(d.size)}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Type</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${d.type}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Interface</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${d.interfaceType}">
      </div>
    </div>
  </div>`
}

module.exports = {
  Disk: Disk
}
