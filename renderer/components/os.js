function OperatingSystem (os) {
  return `<div>
    <h5>Operating System</h5>
    <div class="form-group row">
      <div class="row col-8">
        <label class="col-3 col-form-label">Name</label>
        <div class="col-9 form-group">
          <input type="text" readonly class="form-control" value="${os.distro}">
        </div>
        <label class="col-3 col-form-label">Host</label>
        <div class="col-9 form-group">
          <input type="text" readonly class="form-control" value="${os.hostname}">
        </div>
        <label class="col-3 col-form-label">Serial</label>
        <div class="col-9 form-group">
          <input type="text" readonly class="form-control" value="${os.serial}">
        </div>
        <label class="col-3 col-form-label">Version</label>
        <div class="col-3 form-group">
          <input type="text" readonly class="form-control" value="${os.release}">
        </div>
        <label class="col-3 col-form-label">Kernel</label>
        <div class="col-3 form-group">
          <input type="text" readonly class="form-control" value="${os.kernel}">
        </div>
        <label class="col-3 col-form-label">Build</label>
        <div class="col-3 form-group">
          <input type="text" readonly class="form-control" value="${os.build}">
        </div>
        <label class="col-3 col-form-label">Codename</label>
        <div class="col-3 form-group">
          <input type="text" readonly class="form-control" value="${os.codename !== '' ? os.codename : 'None'}">
        </div>
        <label class="col-3 col-form-label">Architecture</label>
        <div class="col-3 form-group">
          <input type="text" readonly class="form-control" value="${os.arch}">
        </div>
        <label class="col-3 col-form-label">Platform</label>
        <div class="col-3 form-group">
          <input type="text" readonly class="form-control" value="${os.platform}">
        </div>
      </div>
      <div class="col-4 d-flex align-items-center justify-content-center">
        <img src="images/logos/${os.logofile === '' ? 'empty' : os.logofile}.png" class="mw-100" style="max-height: 20rem;">
      </div>
    </div>
  </div>
  <hr>`
}

module.exports = {
  OperatingSystem: OperatingSystem
}
