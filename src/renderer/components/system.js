function System (sys) {
  return `<div>
    <h5>System</h5>
    <div class="row">
      <label class="col-sm-2 col-xl-1 col-form-label">Model</label>
      <div class="col-sm-10 col-md-10 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${sys.model}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Manufacturer</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${sys.manufacturer}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Serial</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${sys.serial}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">UUID</label>
      <div class="col-sm-10 col-md-10 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${sys.uuid}">
      </div>
    </div>
  </div>
  <hr>`
}

module.exports = {
  System: System
}
