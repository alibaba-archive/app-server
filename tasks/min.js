var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('config');

gulp.task('uglify', function() {
  return gulp.src(config.staticPath + '**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./.min'));
});