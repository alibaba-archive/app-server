var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config = require('config');
var path = require('path');

gulp.task('uglify', function() {
  gulp.src([
    config.staticPath + 'script/app.js'
  ], {
    base: path.join(__dirname + '/../', config.staticPath)
  })
    .pipe(uglify())
    .pipe(gulp.dest('./.min'));
});