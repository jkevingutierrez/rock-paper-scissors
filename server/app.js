const express = require('express');
const compress = require('compression');
const path = require('path');
const robots = require('express-robots');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const game = require('./routes/game');
const movement = require('./routes/movement');
const parameter = require('./routes/parameter');

const mongoose = require('mongoose');

const ParameterExpert = require('./expert/parameter-expert');
const MovementExpert = require('./expert/movement-expert');

mongoose.Promise = global.Promise;

var uriString =
  process.env.PROD_MONGODB ||
  process.env.MONGODB_URI ||
  'mongodb://localhost/rock-paper-scissors';

mongoose.connect(uriString, {
    useMongoClient: true,
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

const app = express();

// port setup
app.listen(9000, function() {
  console.log('app listening on port 9000!');

  console.log(ParameterExpert);

  ParameterExpert.initDefaultValues();
  MovementExpert.initDefaultValues();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /dist
app.use(favicon(path.join(__dirname, '../dist', 'favicon.ico')));
app.use(robots(path.join(__dirname, '../dist', 'robots.txt')));
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/', index);
app.use('/game', game);
app.use('/movement', movement);
app.use('/parameter', parameter);

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
  res.json(err);
});

module.exports = app;
