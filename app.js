var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgn = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

var logger = require('morgan');

var passport = require('passport');
var i18n = require('./models/i18n');


var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var admin = require('./routes/admin')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// i18n init parses req for language headers, cookies, etc.
app.use(i18n.init);

app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/', auth);
app.use('/users', users);

app.use('/admin', require('connect-ensure-login').ensureLoggedIn('/login'), admin);

app.use(session({
  secret:'xushd-session',
  cookie:{
    maxAge:24*60*60*1000
  },
  resave:false,
  saveUninitialized:false
}));



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
