var gulp = require('gulp');
var revall = require('gulp-rev-all');
var path = require('path');
var config = require('config');
var pkg = require('../package.json');
var versionFolder = pkg.version.replace(/[^\.]+$/, 'x');

gulp.task('rev', function() {
  return gulp.src('.min/**')
    .pipe(revall())
    .pipe(gulp.dest('./.cdn/' + versionFolder))
    .pipe(revall.manifest({
      fileName: 'static-resource-map.json'
    }))
    .pipe(gulp.dest('.meta/'));
});