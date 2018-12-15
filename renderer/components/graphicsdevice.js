/* global formatBytes */
function GraphicsDevice (d, i) {
  return `<div>
    <h5>Device ${i}</h5>
    <div class="form-group row">
      <label class="col-2 col-form-label">Model</label>
      <div class="col-10">
        <input type="text" readonly class="form-control" value="${d.model}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">Manufacturer</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${d.vendor}">
      </div>
      <label class="col-2 col-form-label">DRAM</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${d.vramDynamic ? 'Yes' : 'No'}">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-2 col-form-label">RAM</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${formatBytes(++d.vram * 1024 ** 2)}">
      </div>
      <label class="col-2 col-form-label">Bus</label>
      <div class="col-4">
        <input type="text" readonly class="form-control" value="${d.bus}">
      </div>
    </div>
  </div>
  `
}

module.exports = {
  GraphicsDevice: GraphicsDevice
}
