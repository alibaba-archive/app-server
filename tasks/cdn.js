var gulp = require('gulp');
var gutil = require('gulp-util');
var upyunDest = require('gulp-upyun').upyunDest;
var config = require('config');

gulp.task('upyun', function() {
  return gulp.src('./.cdn/**/*')
    .pipe(upyunDest('dn-st/' + config.cdn.upyun.folder, {
      username: config.cdn.upyun.username,
      password: config.cdn.upyun.password
    }).on('error', gutil.log))
})