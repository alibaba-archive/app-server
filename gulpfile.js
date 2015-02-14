var gulp = require('gulp');
var less = require('gulp-less');
var revall = require('gulp-rev-all');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var config = require('config');
var path = require('path');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
  return gulp.src(config.staticPath + '**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./.min'));
});

gulp.task('coffee', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(config.staticPath))
});

gulp.task('less', function() {
  gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(config.staticPath))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*.less', ['less']);
  gulp.watch('src/**/*.coffee', ['coffee']);
});

gulp.task('clean', function () {
  gulp.src('./.cdn')
    .pipe(clean())
})

gulp.task('cdn', function() {
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