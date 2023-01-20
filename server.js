require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt2 = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use JWT auth to secure the api
app.use(jwt2());

// api routes
app.use('/users', require('./users/user.controller'));
app.use('/drivers', require('./drivers/driver.controller'));
app.use('/rides', require('./ride/ride.controller'));

// global error handler
app.use(errorHandler);

const port = 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app