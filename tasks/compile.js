var gulp = require('gulp');
var less = require('gulp-less');
var coffee = require('gulp-coffee');
var config = require('config');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

gulp.task('coffee', function() {
  return gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./static'))
});

gulp.task('less', function() {
  return gulp.src('./src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./static'))
    .pipe(livereload());
});

gulp.task('compile', ['coffee', 'less'])