const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.set('view engine', 'jade'); 

app.use('/uploads', express.static('uploads'))

app.use('/api',require('./routes'));

if(!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err, req, res, next) {
  // УБРАЛИ res.locals 
  
  console.error('API Error:', {
    message: err.message,
    status: err.status || 500,
    path: req.path,
    method: req.method,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
  
  res.status(err.status || 500);
  res.json({
    success: false,
    error: {
      message: req.app.get('env') === 'development' ? err.message : 'Internal Server Error',
      status: err.status || 500
    }
  });
});

module.exports = app;