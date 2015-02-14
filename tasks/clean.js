var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
  gulp.src('./.cdn')
    .pipe(clean());
  gulp.src('./.min')
    .pipe(clean());
});