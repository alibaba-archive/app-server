var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var i18n = require('i18n');
var uaParser = require('ua-parser');
var config = require('config');
var pkg = require('./package.json');
var versionFolder = pkg.version.replace(/[^\.]+$/, 'x');

i18n.configure({
  locales: ['en', 'zh-CN'],
  directory: __dirname + '/locales',
  defaultLocale: 'zh-CN'
})

var app = express();

var env = app.get('env');

var staticResourceMap = require('./static-resource-map.json')
function staticResource(resource) {
  if (env == 'development') {
    return '/'+ resource;
  }
  else if (env == 'build') {
    return '/' + versionFolder + '/' + staticResourceMap[resource];
  } else {
    return config.cdn.upyun.host + '/' + config.cdn.upyun.folder + '/' + versionFolder + '/' + staticResourceMap[resource];
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

if (env == 'development') {
  app.use(express.static(path.join(__dirname, 'static')));
} else if (env == 'build') {
  app.use(express.static(path.join(__dirname, './.cdn')));
}

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
  var r = uaParser.parse(req.headers['user-agent']);
  req.r = r
  next()
});

app.use(function (req, res, next) {
  var ua = req.headers['user-agent'].toLowerCase()

  var isSpider = config.spiders.some(function (spider) {
    return ua.indexOf(spider) > -1
  })

  if (isSpider) {
    res.redirect('/site')
  } else {
    next()
  }
})

app.get('/site', function(req, res) {
  res.render('site', {
    r: req.r,
    env: app.get('env'),
    staticResource:staticResource
  })
});

app.use('/app', function(req, res) {
  res.render('app', {
    r: req.r,
    title: 'app-server',
    env: app.get('env'),
    staticResource:staticResource
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
      error: err,
      staticResource:staticResource
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    staticResource:staticResource
  });
});


module.exports = app;