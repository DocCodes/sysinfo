function Processor (cpu) {
  return `<div>
    <h5>Processor</h5>
    <div class="row">
      <label class="col-sm-2 col-xl-1 col-form-label">Processor</label>
      <div class="col-sm-10 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.brand}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Manufacturer</label>
      <div class="col-sm-4 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.manufacturer}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Vendor</label>
      <div class="col-sm-4 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.vendor}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Cores</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.physicalCores}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Threads</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.cores}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Socket</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.socket}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Family</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.family}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Model</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.model}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Stepping</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${cpu.stepping}">
      </div>
    </div>
  </div>
  <hr>`
}

module.exports = {
  Processor: Processor
}
