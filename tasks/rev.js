var gulp = require('gulp');
var revall = require('gulp-rev-all');
var path = require('path');
var config = require('config');

gulp.task('rev', function() {
  gulp.src('.min/**')
    .pipe(revall())
    .pipe(gulp.dest('./.cdn'))
    .pipe(revall.manifest({
      fileName: 'static-resource-map.json'
    }))
    .pipe(gulp.dest('./'));
});