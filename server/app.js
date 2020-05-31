var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var cors = require('cors');
var app = express();
var router = express.Router();
var websockets = require('./websockets');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var searchRouter = require('./routes/searchRouter');
var itemRouter = require('./routes/itemRouter');
var authRouter = require('./routes/authRouter');
var cartRouter = require('./routes/cartRouter').cart;
var userRouter = require('./routes/userRouter');
var farmerRouter = require('./routes/farmerRouter');
var mysqlRouter = require('./config');
var cli_color = require('./common').cli_color;

global.db=mysqlRouter;

app.use('/api',(req,res,next)=>{
  res.end('AgriBazaar Server is Up!')
});
app.use('/search',searchRouter);
app.use('/item',itemRouter);
app.use('/auth',authRouter);
app.use('/cart',cartRouter);
app.use('/users',userRouter);
app.use('/farmers',farmerRouter);
// catch 404 and forward to error handler


app.use(function(req, res, next) {
  next(createError(404));
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
