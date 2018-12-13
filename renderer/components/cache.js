/* global formatBytes */
function Cache (cpu) {
  return `<div class="col-8">
    <h5>Cache</h5>
    <div class="form-group row">
      <label class="col-3 col-form-label">L1 Data</label>
      <div class="col-6">
        <input type="text" readonly class="form-control" value="${formatBytes(cpu.cache.l1d)}">
      </div>
      <div class="col-3">
        <input type="text" readonly class="form-control" value="${cpu.cores}-way">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-3 col-form-label">L1 Inst.</label>
      <div class="col-6">
        <input type="text" readonly class="form-control" value="${formatBytes(cpu.cache.l1i)}">
      </div>
      <div class="col-3">
        <input type="text" readonly class="form-control" value="${cpu.cores}-way">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-3 col-form-label">L2 Cache</label>
      <div class="col-6">
        <input type="text" readonly class="form-control" value="${formatBytes(cpu.cache.l2)}">
      </div>
      <div class="col-3">
        <input type="text" readonly class="form-control" value="${cpu.cores}-way">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-3 col-form-label">L3 Cache</label>
      <div class="col-6">
        <input type="text" readonly class="form-control" value="${formatBytes(cpu.cache.l3)}">
      </div>
      <div class="col-3">
        <input type="text" readonly class="form-control" value="${cpu.cores * 2}-way">
      </div>
    </div>
  </div>`
}

module.exports = {
  Cache: Cache
}
