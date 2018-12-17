function Processor (cpu) {
  return `<div>
    <h5>Processor</h5>
    <div class="form-group row">
      <label class="col-2 col-form-label">Processor</label>
      <div class="col-10">
        <input type="text" readonly class="form-control" value="${cpu.brand}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Cores</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${cpu.physicalCores}">
      </div>
      <label class="col-2 col-form-label">Threads</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${cpu.cores}">
      </div>
        <label class="col-2 col-form-label">Socket</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${cpu.socket}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Manufacturer</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${cpu.manufacturer}">
      </div>
      <label class="col-2 col-form-label">Vendor</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${cpu.vendor}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Family</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${cpu.family}">
      </div>
      <label class="col-2 col-form-label">Model</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${cpu.model}">
      </div>
      <label class="col-2 col-form-label">Stepping</label>
      <div class="col-2">
        <input type="text" readonly class="form-control" value="${cpu.stepping}">
      </div>
    </div>
  </div>
  <hr>`
}

module.exports = {
  Processor: Processor
}
