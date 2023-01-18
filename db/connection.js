const monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/safeboda';
const db = monk(connectionString);

module.exports = db;