var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/**/*.coffee', ['coffee']);
});