var gulp = require('gulp');
var less = require('gulp-less');
var revall = require('gulp-rev-all');
var livereload = require('gulp-livereload');
var config = require('config');

gulp.task('less', function() {
  gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest(config.staticPath + '/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/less/*.less', ['less']);
});

gulp.task('min', function() {
  gulp.src(config.staticPath + '/**')
    .pipe(revall())
    .pipe(gulp.dest('./.cdn'))
    .pipe(revall.manifest({
      fileName: 'static-resource-map.json'
    }))
    .pipe(gulp.dest('./'));
});