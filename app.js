const express = require('express');

require('dotenv').config()

const app = express();

const apiRoutes = require('./api/routes/the-api');


//home page
app.get('/', (req, res, next) => {
  const localTime = (new Date()).toLocaleTimeString();

  res.status(200).send(`hello gigel user! server run start on ${localTime}.`)
});

//Routes to handle request
app.use('/api', apiRoutes);

// catch 404
app.use((req, res, next) => {
  const error = new Error('this route is not available, please back to home');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
