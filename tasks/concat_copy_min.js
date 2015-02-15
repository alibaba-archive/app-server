var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('config');
var path = require('path');
var rjs = require('gulp-requirejs');
var minifyCSS = require('gulp-minify-css');

// start copy
gulp.task('copy', function() {
  gulp.src([
    config.staticPath + '/bower_components/teambition-ui/dist/fonts/*',
    config.staticPath + '/images/**'
  ], {
    base: path.join(__dirname + '/../', config.staticPath)
  })
    .pipe(gulp.dest('./.min'));
})
// end copy


// start min script
gulp.task('uglify', function() {
  gulp.src([
    config.staticPath + 'script/app.js'
  ], {
    base: path.join(__dirname + '/../', config.staticPath)
  })
    .pipe(uglify())
    .pipe(gulp.dest('./.min'));
});
// end min script

// start min style
gulp.task('cssmin', function () {
  gulp.src([
    config.staticPath + '/bower_components/teambition-ui/dist/css/teambition-ui.css',
    config.staticPath + '/style/app.css'
  ], {
    base: path.join(__dirname + '/../', config.staticPath)
  })
    .pipe(minifyCSS())
    .pipe(gulp.dest('./.min'))
})
// end min style


// start requirejs
gulp.task('requirejs', function() {
  rjs({
    name: 'main',
    baseUrl: 'static/script',
    mainConfigFile: 'static/script/main.js',
    out: 'main.js',
    shim: {},
  })
    .pipe(uglify())
    .pipe(gulp.dest('./.min/script/'));
});
// end requirejs