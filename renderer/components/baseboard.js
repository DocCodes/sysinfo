function Baseboard (bb) {
  return `<div>
    <h5>Baseboard</h5>
    <div class="form-group row">
      <label class="col-2 col-form-label">Manufacturer</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${bb.manufacturer}">
      </div>
      <label class="col-2 col-form-label">Model</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${bb.model}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Serial</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${bb.serial}">
      </div>
      <label class="col-2 col-form-label">Asset</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${bb.assetTag}">
      </div>
    </div>
  </div>`
}

module.exports = {
  Baseboard: Baseboard
}
