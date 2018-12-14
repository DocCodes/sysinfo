function ClockSpeed (clock) {
  return `<div class="col-4">
    <h5>Clocks</h5>
    <div class="form-group row">
      <label class="col-6 col-form-label">Max Clock</label>
      <div class="col-6">
        <input type="text" readonly class="form-control" value="${clock.max} GHz">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-6 col-form-label">Avg. Clock</label>
      <div class="col-6">
        <input type="text" readonly class="form-control" value="${clock.avg} GHz">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-6 col-form-label">Min Clock</label>
      <div class="col-6">
        <input type="text" readonly class="form-control" value="${clock.min} GHz">
      </div>
    </div>
  </div>`
}

module.exports = {
  ClockSpeed: ClockSpeed
}
