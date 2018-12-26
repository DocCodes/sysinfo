/* global formatBytes */
function GraphicsDevice (d, i) {
  return `<div>
    <h5>Device ${i}</h5>
    <div class="row">
      <label class="col-sm-2 col-xl-1 col-form-label">Model</label>
      <div class="col-sm-10 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${d.model}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Manufacturer</label>
      <div class="col-sm-4 col-md-4 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${d.vendor}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">DRAM</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${d.vramDynamic ? 'Yes' : 'No'}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">RAM</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${formatBytes(++d.vram * 1024 ** 2)}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Bus</label>
      <div class="col-sm-4 col-md-2 col-xl-3 form-group">
        <input type="text" readonly class="form-control" value="${d.bus}">
      </div>
    </div>
  </div>
  `
}

module.exports = {
  GraphicsDevice: GraphicsDevice
}
