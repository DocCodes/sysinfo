#!/usr/bin/env node

/**
 * Builds app binaries for Mac, Windows, and Linux.
 */

const cp = require('child_process')
const electronPackager = require('electron-packager')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const series = require('run-series')
const zip = require('cross-zip')

const pkg = require('../package.json')
const config = require('../config')
const codeName = pkg.name
const humanName = config.APP_NAME

const BUILD_NAME = `${codeName}-${config.APP_VERSION}`
const BUILD_PATH = path.join(config.ROOT_PATH, 'builds')

function build () {
  console.log('Reinstalling node_modules')
  cp.execSync('npm install', { stdio: 'inherit' })
  cp.execSync('npm dedupe', { stdio: 'inherit' })

  console.log('Nuking builds/')
  rimraf.sync(BUILD_PATH)
  fs.mkdirSync(BUILD_PATH)

  if (process.platform === 'darwin') {
    buildDarwin(printDone)
    buildLinux(printDone)
  } else if (process.platform === 'win32') {
    buildWin32(printDone)
  } else if (process.platform === 'linux') {
    buildLinux(printDone)
  }
}

const all = {
  'app-copyright': config.APP_COPYRIGHT,
  'app-version': config.APP_VERSION,
  asar: {
    unpack: 'SysInfo*'
  },
  'build-version': config.APP_VERSION,
  dir: config.ROOT_PATH,
  name: codeName,
  out: BUILD_PATH,
  overwrite: true,
  prune: true,
  electronVersion: require('electron/package.json').version
}

const darwin = {
  platform: 'darwin',
  arch: 'x64',
  'app-bundle-id': 'com.evaneliasyoung.sysinfo',
  'app-category-type': 'public.app-category.utilities',
  'helper-bundle-id': 'com.evaneliasyoung.sysinfo-helper',
  icon: config.APP_ICON
}

const win32 = {
  platform: 'win32',
  arch: ['ia32', 'x64'],
  win32metadata: {
    CompanyName: config.TEAM_NAME,
    FileDescription: config.APP_DESCRIPTION,
    OriginalFilename: `${codeName}.exe`,
    ProductName: humanName,
    InternalName: codeName
  },
  icon: config.APP_ICON
}

const linux = {
  platform: 'linux',
  arch: ['ia32', 'x64']
}

build()

function buildDarwin (cb) {
  console.log('Mac: Packaging electron')
  electronPackager(Object.assign({}, all, darwin), function (err, buildPath) {
    if (err) return cb(err)
    console.log(`Mac: Packaged electron. ${buildPath}`)

    const appPath = path.join(buildPath[0], `${codeName}.app`)
    const contentsPath = path.join(appPath, 'Contents')
    const resourcesPath = path.join(contentsPath, 'Resources')

    // Copy torrent file icon into app bundle
    cp.execSync(`cp ${config.APP_ICON} ${resourcesPath}`)

    console.log('Packing')
    pack(cb)
    function pack (cb) {
      packageZip()
      packageDmg(cb)
    }

    function packageZip () {
      console.log('Mac: Creating zip')

      const inPath = path.join(buildPath[0], `${codeName}.app`)
      const outPath = path.join(BUILD_PATH, `${BUILD_NAME}-darwin.zip`)
      zip.zipSync(inPath, outPath)

      console.log('Mac: Created zip')
    }

    function packageDmg (cb) {
      console.log('Mac: Creating dmg')

      const appDmg = require('appdmg')

      const targetPath = path.join(BUILD_PATH, `${BUILD_NAME}.dmg`)
      rimraf.sync(targetPath)

      const dmgOpts = {
        basepath: config.ROOT_PATH,
        target: targetPath,
        specification: {
          title: humanName,
          icon: config.APP_ICON,
          'icon-size': 128,
          contents: [
            { x: 122, y: 120, type: 'file', path: appPath },
            { x: 380, y: 120, type: 'link', path: '/Applications' },
            { x: 50, y: 300, type: 'position', path: '.background' },
            { x: 100, y: 300, type: 'position', path: '.DS_Store' },
            { x: 150, y: 300, type: 'position', path: '.Trashes' },
            { x: 150, y: 300, type: 'position', path: '.VolumeIcon.icns' }
          ]
        }
      }

      const dmg = appDmg(dmgOpts)
      dmg.on('progress', function (info) {
        if (info.type === 'step-begin') {
          console.log(`${info.title}`)
        }
      })
      dmg.once('finish', function (info) {
        console.log('Mac: Created dmg')
        cb(null)
      })
    }
  })
}

function buildWin32 (cb) {
  const installer = require('electron-winstaller')
  console.log('Windows: Packaging electron.')

  electronPackager(Object.assign({}, all, win32), function (err, buildPath) {
    if (err) return cb(err)
    console.log(`Windows: Packaged electron. ${buildPath}`)

    const tasks = []
    buildPath.forEach(function (filesPath) {
      const destArch = filesPath.split('-').pop()
      tasks.push((cb) => packageZip(filesPath, destArch, cb))
      tasks.push((cb) => packageInstaller(filesPath, destArch, cb))
      tasks.push((cb) => packageDelete(filesPath, destArch, cb))
    })
    series(tasks, cb)

    function packageDelete (filesPath, destArch, cb) {
      console.log(`Windows: Deleting ${destArch} build.`)
      const inPath = path.join(BUILD_PATH, path.basename(filesPath))
      rimraf.sync(inPath)

      console.log(`Windows: Deleted ${destArch} build.`)
      cb(null)
    }

    function packageZip (filesPath, destArch, cb) {
      console.log(`Windows: Creating ${destArch} zip.`)
      const archStr = destArch === 'ia32' ? 'ia32' : 'x64'

      const inPath = path.join(BUILD_PATH, path.basename(filesPath))
      const outPath = path.join(BUILD_PATH, `${BUILD_NAME}-win32-${archStr}.zip`)
      zip.zipSync(inPath, outPath)

      console.log(`Windows: Created ${destArch} zip.`)
      cb(null)
    }

    function packageInstaller (filesPath, destArch, cb) {
      console.log(`Windows: Creating ${destArch} installer.`)
      const archStr = destArch === 'ia32' ? 'ia32' : 'x64'

      installer.createWindowsInstaller({
        appDirectory: filesPath,
        authors: config.APP_TEAM,
        description: config.APP_DESCRIPTION,
        exe: `${codeName}.exe`,
        iconUrl: `${config.GITHUB_URL_RAW}/icons/win/icon.ico`,
        name: humanName,
        noMsi: true,
        outputDirectory: BUILD_PATH,
        productName: humanName,
        setupExe: `${humanName}-Setup-${config.APP_VERSION}-${archStr}.exe`,
        setupIcon: config.APP_ICON,
        title: humanName,
        usePackageJson: false,
        version: config.APP_VERSION
      })
        .then(function () {
          console.log(`Windows: Created ${destArch} installer.`)

          fs.readdirSync(BUILD_PATH)
            .filter((name) => name.endsWith('.nupkg') && !name.includes(config.APP_VERSION))
            .forEach((filename) => {
              fs.unlinkSync(path.join(BUILD_PATH, filename))
            })

          if (destArch === 'ia32') {
            console.log('Windows: Renaming ia32 installer files')

            const relPath = path.join(BUILD_PATH, 'RELEASES-ia32')
            fs.renameSync(
              path.join(BUILD_PATH, 'RELEASES'),
              relPath
            )

            fs.renameSync(
              path.join(BUILD_PATH, `${codeName}-${config.APP_VERSION}-full.nupkg`),
              path.join(BUILD_PATH, `${codeName}-${config.APP_VERSION}-ia32-full.nupkg`)
            )

            const relContent = fs.readFileSync(relPath, 'utf8')
            const relContent32 = relContent.replace('full.nupkg', 'ia32-full.nupkg')
            fs.writeFileSync(relPath, relContent32)

            if (relContent === relContent32) {
              throw new Error('Fixing RELEASES-ia32 failed. Replacement did not modify the file.')
            }

            console.log('Windows: Renamed ia32 installer files.')
          }

          cb(null)
        })
        .catch(cb)
    }
  })
}

function buildLinux (cb) {
  console.log('Linux: Packaging electron')
  electronPackager(Object.assign({}, all, linux), function (err, buildPath) {
    if (err) return cb(err)
    console.log(`Linux: Packaged electron. ${buildPath}`)

    const tasks = []
    buildPath.forEach(function (filesPath) {
      const destArch = filesPath.split('-').pop()

      tasks.push((cb) => packageDeb(filesPath, destArch, cb))
      tasks.push((cb) => packageZip(filesPath, destArch, cb))
    })
    series(tasks, cb)
  })

  function packageDeb (filesPath, destArch, cb) {
    console.log(`Linux: Creating ${destArch} deb.`)
    const deb = require('nobin-debian-installer')()
    const destPath = path.join('/opt', codeName)

    deb.pack({
      package: pkg,
      info: {
        arch: destArch === 'x64' ? 'amd64' : 'i386',
        targetDir: BUILD_PATH,
        depends: 'gconf2, libgtk2.0-0, libnss3, libxss1'
      }
    }, [{
      src: ['./**'],
      dest: destPath,
      expand: true,
      cwd: filesPath
    }], function (err) {
      if (err) return cb(err)
      console.log(`Linux: Created ${destArch} deb.`)
      cb(null)
    })
  }

  function packageZip (filesPath, destArch, cb) {
    console.log(`Linux: Creating ${destArch} zip.`)
    const archStr = destArch === 'ia32' ? 'ia32' : 'x64'

    const inPath = path.join(BUILD_PATH, path.basename(filesPath))
    const outPath = path.join(BUILD_PATH, `${BUILD_NAME}-linux-${archStr}.zip`)
    zip.zipSync(inPath, outPath)

    console.log(`Linux: Created ${destArch} zip.`)
    cb(null)
  }
}

function printDone (err) {
  if (err) console.error(err.message || err)
}
