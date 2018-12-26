/* global formatBytes */
function Memory (m, i) {
  return `<div>
    <h5>Memory Module ${i}</h5>
    <div class="row">
      <label class="col-sm-2 col-xl-1 col-form-label">Model</label>
      <div class="col-sm-10 col-md-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${m.partNum}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Serial</label>
      <div class="col-sm-10 col-md-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${m.serialNum}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Manufacturer</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${m.manufacturer}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Form Factor</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${m.formFactor}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Speed</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${m.clockSpeed} MHz">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Amount</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${formatBytes(m.size)}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Slot</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${m.bank}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Voltage</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${m.voltageConfigured} V">
      </div>
    </div>
  </div>
  `
}

module.exports = {
  Memory: Memory
}
