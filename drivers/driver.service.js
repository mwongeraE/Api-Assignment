const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../_helpers/db");
const Role = require("_helpers/role");
const User = db.Driver;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ username, password }) {
  const driver = await User.findOne({ username });
  if (driver && bcrypt.compareSync(password, driver.hash)) {
    const token = jwt.sign({ sub: driver.id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...driver.toJSON(),
      token,
    };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
    const driver = await User.findById(id);
    console.log("DRIVER DB USER", driver)
    return {
        ...driver.toJSON()
    }
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  const driver = new User(userParam);

  // hash password
  if (userParam.password) {
    driver.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save driver
  await driver.save();
  return {
    ...driver.toJSON()
  }
}

async function update(id, userParam) {
  const driver = await User.findById(id);

  // validate
  if (!driver) throw "User not found";
  if (
    driver.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to driver
  Object.assign(driver, userParam);

  await driver.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
