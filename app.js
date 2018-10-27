// server.js

// first we import our dependencies…
// import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
var mongoose = require('mongoose');
var path = require('path');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/truck-portal', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
// and create our instances 
const express = require('express');
const app = express();
var truck = require('./routes/truck');
var cors = require('cors');

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


// Use our router configuration when we call /api
app.use("/api/v1", truck);
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
    res.json({message:err.message,error:err});
  });


app.use(cors());

app.options('*', cors());


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));