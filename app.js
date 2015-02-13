var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var i18n = require('i18n');
var uaParser = require('ua-parser');

i18n.configure({
  locales: ['en', 'zh-CN'],
  directory: __dirname + '/locales',
  defaultLocale: 'zh-CN'
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n.init);

// console.log(r.ua.toString());        // -> "Safari 5.0.1"
// console.log(r.ua.toVersionString()); // -> "5.0.1"
// console.log(r.ua.family)             // -> "Safari"
// console.log(r.ua.major);             // -> "5"
// console.log(r.ua.minor);             // -> "0"
// console.log(r.ua.patch);             // -> "1"

// console.log(r.os.toString());        // -> "iOS 5.1"
// console.log(r.os.toVersionString()); // -> "5.1"
// console.log(r.os.family)             // -> "iOS"
// console.log(r.os.major);             // -> "5"
// console.log(r.os.minor);             // -> "1"
// console.log(r.os.patch);             // -> null

// console.log(r.device.toString());    // -> "iPhone"
// console.log(r.device.family);        // -> "iPhone"
// console.log(r.device.isMobile);      // -> true
// console.log(r.device.isSpider)       // -> false
app.get("*", function(req, res, next) {
  r = uaParser.parse(req.headers['user-agent']);
  req.r = r
});

app.get('/site', function(req, res) {
  res.render('site', {
    r: req.r
  })
});

app.use('/app', function(req, res) {
  res.render('app', {
    r: req.r
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;