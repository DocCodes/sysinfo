const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const pump = require('pump-promise')
const tilde = require('node-sass-tilde-importer')

$.sass.compiler = require('node-sass')

gulp.task('css', () => {
  return new Promise((resolve, reject) => {
    pump([
      gulp.src('src/**/*.scss'),
      $.newer('build'),
      $.sass.sync({ importer: tilde, outputStyle: 'compressed' }).on('error', $.sass.logError),
      gulp.dest('build')
    ]).then(resolve).catch(reject)
  })
})

gulp.task('html', () => {
  return new Promise((resolve, reject) => {
    pump([
      gulp.src('src/**/*.html'),
      $.newer('build'),
      $.htmlmin(),
      gulp.dest('build')
    ]).then(resolve).catch(reject)
  })
})

gulp.task('js', () => {
  return new Promise((resolve, reject) => {
    pump([
      gulp.src('src/**/*.js'),
      $.newer('build'),
      $.minify({ ext: { src: '-debug.js', min: '.js' }, noSource: true }),
      gulp.dest('build')
    ]).then(resolve).catch(reject)
  })
})

gulp.task('components', () => {
  return new Promise((resolve, reject) => {
    pump([
      gulp.src('src/renderer/components/*.js'),
      $.newer('build'),
      $.concat('components.js'),
      $.minify({ ext: { src: '-debug.js', min: '.js' }, noSource: true }),
      gulp.dest('build/renderer')
    ]).then(resolve).catch(reject)
  })
})

gulp.task('fonts', () => {
  return new Promise((resolve, reject) => {
    pump([
      gulp.src('src/**/*.ttf'),
      gulp.dest('build')
    ]).then(resolve).catch(reject)
  })
})

gulp.task('images', () => {
  return new Promise((resolve, reject) => {
    pump([
      gulp.src('src/renderer/images/**/*'),
      $.imagemin(),
      gulp.dest('build/renderer/images/')
    ]).then(resolve).catch(reject)
  })
})

gulp.task('static', gulp.parallel('fonts', 'images'))
gulp.task('code', gulp.parallel('css', 'html', 'js', 'components'))
gulp.task('light', gulp.parallel('css', 'js'))

gulp.task('all', gulp.parallel('static', 'code'))
gulp.task('default', gulp.parallel('code'))
