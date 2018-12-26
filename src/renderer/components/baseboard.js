function Baseboard (bb) {
  return `<div>
    <h5>Baseboard</h5>
    <div class="row">
      <label class="col-sm-2 col-md-2 col-xl-1 col-form-label">Manufacturer</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${bb.manufacturer}">
      </div>
      <label class="col-sm-2 col-md-2 col-xl-1 col-form-label">Model</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${bb.model}">
      </div>
      <label class="col-sm-2 col-md-2 col-xl-1 col-form-label">Serial</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${bb.serial}">
      </div>
      <label class="col-sm-2 col-md-2 col-xl-1 col-form-label">Asset</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${bb.assetTag}">
      </div>
    </div>
  </div>`
}

module.exports = {
  Baseboard: Baseboard
}
