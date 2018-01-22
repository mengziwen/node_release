var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var views = path.join(__dirname, './views');
var src = path.join(__dirname, './src');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(src));

app.use(express.static(views,{'index':['index.html']}));

app.use('/', index);
app.use('/users', users);

app.use('/api', function (req, res, next) {
    req.originalUrl = req.originalUrl.replace("/api", "");

    var options = {
        host: "192.168.9.198",
        port: "9090",
        path: '/app-server'+req.originalUrl,
        method: req.method,
        headers:req.headers
    };
    // options.headers.host="192.168.9.198";
    // options.headers.origin="http://192.168.9.198:9090";
    // options.headers.referer="http://192.168.9.198";
    var request = http.request(options,function(response){
        res.statusCode = response.statusCode;
        response.setEncoding('utf8');
        response.on('data',function (data) {
            var str=JSON.parse(data.toString());
            res.send(str);
        });
        response.on('end', function(data){
            console.log('done');
        });
    });
    request.write(JSON.stringify(req.body));
    request.end();

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
