const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../_helpers/db");
const Role = require("_helpers/role");
const User = db.Ride;
const passenger = db.User;
const driver = db.Driver

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getAll() {
  return await User.find().where('status', true);;
}

async function getById(id) {
  return await User.findById(id);
}

async function create(passid, driverid, userParam) {
    const pass = await passenger.findOne({ passid });
    console.log(pass)
    const drver = await driver.findOne({ driverid });
    console.log(drver)
    const availableRider = await User.findOne( {status: false} )
    console.log(availableRider)

    console.log("params", userParam)
  // validate
  if (!drver) throw "No driver found"
  if (
    drver.suspended == true || availableRider.status == true) {
    throw 'Find another ride';
  }

  const rtest = {
    passenger: passid,
    driver: driverid,
    status: 'Ongoing',
    ...userParam
  }

  console.log("R-test", rtest)

  const ride = new User(rtest);

  // save user
  await ride.save();

  return {
    ...ride.toJSON()
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();

  return {
    ...user.toJSON()
  }
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
