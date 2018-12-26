/* global formatBytes */
function ClockCache (clock, cpu) {
  return `<div>
    <div class="row">
    <h5 class="col-sm-4">Clocks</h5>
    <h5 class="col-sm-8">Cache</h5>
    <label class="col-sm-2 col-xl-1 col-form-label">Maximum</label>
    <div class="col-sm-2 col-xl-3 form-group">
      <input type="text" readonly class="form-control" value="${clock.max} GHz">
    </div>
    <label class="col-sm-2 col-xl-1 col-form-label">L1 Cache</label>
    <div class="col-sm-4 col-xl-5 form-group">
      <input type="text" readonly class="form-control" value="${formatBytes(cpu.cache.l1d)}">
    </div>
    <div class="col-sm-2 form-group">
      <input type="text" readonly class="form-control" value="${cpu.physicalCores}-way">
    </div>
    <label class="col-sm-2 col-xl-1 col-form-label">Average</label>
    <div class="col-sm-2 col-xl-3 form-group">
      <input type="text" readonly class="form-control" value="${clock.avg} GHz">
    </div>
    <label class="col-sm-2 col-xl-1 col-form-label">L2 Cache</label>
    <div class="col-sm-4 col-xl-5 form-group">
      <input type="text" readonly class="form-control" value="${formatBytes(cpu.cache.l2)}">
    </div>
    <div class="col-sm-2 form-group">
      <input type="text" readonly class="form-control" value="${cpu.physicalCores}-way">
    </div>
    <label class="col-sm-2 col-xl-1 col-form-label">Minimum</label>
    <div class="col-sm-2 col-xl-3 form-group">
      <input type="text" readonly class="form-control" value="${clock.min} GHz">
    </div>
    <label class="col-sm-2 col-xl-1 col-form-label">L3 Cache</label>
    <div class="col-sm-4 col-xl-5 form-group">
      <input type="text" readonly class="form-control" value="${formatBytes(cpu.cache.l3)}">
    </div>
    <div class="col-sm-2 form-group">
      <input type="text" readonly class="form-control" value="${cpu.cores}-way">
    </div>
    </div>
  </div>`
}

module.exports = {
  ClockCache: ClockCache
}
