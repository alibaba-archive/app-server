var gulp = require('gulp');
var revall = require('gulp-rev-all');
var path = require('path');

gulp.task('rev', function() {
  gulp.src([
      config.staticPath + '/bower_components/teambition-ui/dist/css/teambition-ui.css',
      config.staticPath + '/bower_components/teambition-ui/dist/fonts/*',
    ], {base: path.join(__dirname, config.staticPath)})
    .pipe(revall())
    .pipe(gulp.dest('./.cdn'))
    .pipe(revall.manifest({
      fileName: 'static-resource-map.json'
    }))
    .pipe(gulp.dest('./'));
});