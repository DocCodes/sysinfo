function System (sys) {
  return `<div>
    <h5>System</h5>
    <div class="form-group row">
      <label class="col-2 col-form-label">Model</label>
      <div class="col-10">
        <input type="text" readonly class="form-control" value="${sys.model}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Manufacturer</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${sys.manufacturer}">
      </div>
      <label class="col-2 col-form-label">Serial</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${sys.serial}">
      </div>
    </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">UUID</label>
      <div class="col-10">
        <input type="text" readonly class="form-control" value="${sys.uuid}">
      </div>
    </div>
  </div>
  <hr>`
}

module.exports = {
  System: System
}
