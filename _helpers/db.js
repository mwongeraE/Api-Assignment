const config = require('../config.json');
const mongoose = require('mongoose');
// const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Driver: require('../drivers/driver.model'),
    Ride: require('../ride/ride.model')
};