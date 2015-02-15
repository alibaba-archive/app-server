var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require('config');

gulp.task('clean', function() {
  gulp.src([
    './.cdn',
    config.staticPath + '/style',
    config.staticPath + '/script',
    './.min'
  ])
    .pipe(clean());
});