var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('config');
var path = require('path');
var rjs = require('gulp-requirejs');
var minifyCSS = require('gulp-minify-css');

// start copy
gulp.task('copy', function() {
  return gulp.src([
    './static/bower_components/teambition-ui/dist/fonts/*',
    './static/images/**'
  ], {
    base: path.join(__dirname, '../static')
  })
    .pipe(gulp.dest('./.min'));
})
// end copy


// start min script
gulp.task('uglify', function() {
  return gulp.src([
    './static/script/app.js'
  ], {
    base: path.join(__dirname, '../static')
  })
    .pipe(uglify())
    .pipe(gulp.dest('./.min'));
});
// end min script

// start min style
gulp.task('cssmin', function () {
  return gulp.src([
    './static/bower_components/teambition-ui/dist/css/teambition-ui.css',
    './static/style/app.css'
  ], {
    base: path.join(__dirname, '../static')
  })
    .pipe(minifyCSS())
    .pipe(gulp.dest('./.min'))
})
// end min style


// start requirejs
gulp.task('requirejs', function() {
  return rjs({
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

gulp.task('min', ['copy', 'cssmin', 'requirejs', 'uglify'])