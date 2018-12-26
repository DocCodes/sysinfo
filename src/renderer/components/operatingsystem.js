function OperatingSystem (os) {
  return `<div>
    <h5>Operating System</h5>
    <div class="row">
      <label class="col-sm-2 col-xl-1 col-form-label">Name</label>
      <div class="col-sm-10 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${os.distro}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Host</label>
      <div class="col-sm-10 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${os.hostname}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Serial</label>
      <div class="col-sm-10 col-xl-5 form-group">
        <input type="text" readonly class="form-control" value="${os.serial}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Version</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${os.release}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Kernel</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${os.kernel}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Build</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${os.build}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Codename</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${os.codename !== '' ? os.codename : 'None'}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Architecture</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${os.arch}">
      </div>
      <label class="col-sm-2 col-xl-1 col-form-label">Platform</label>
      <div class="col-sm-4 col-xl-2 form-group">
        <input type="text" readonly class="form-control" value="${os.platform}">
      </div>
    </div>
  </div>
  <hr>`
}

module.exports = {
  OperatingSystem: OperatingSystem
}
