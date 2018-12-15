/* global formatBytes */
function Memory (m, i) {
  return `<div>
    <h5>Memory Module ${i}</h5>
    <div class="form-group row">
      <label class="col-2 col-form-label">Model</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${m.partNum}">
      </div>
      <label class="col-2 col-form-label">Serial</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${m.serialNum}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Manufacturer</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${m.manufacturer}">
      </div>
      <label class="col-2 col-form-label">Form Factor</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${m.formFactor}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Speed</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${m.clockSpeed} MHz">
      </div>
      <label class="col-2 col-form-label">Amount</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${formatBytes(m.size)}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Slot</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${m.bank}">
      </div>
      <label class="col-2 col-form-label">Voltage</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${m.voltageConfigured} V">
      </div>
    </div>
  </div>
  `
}

module.exports = {
  Memory: Memory
}
