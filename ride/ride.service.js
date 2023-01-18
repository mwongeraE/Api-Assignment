const db = require("../_helpers/db");
const Ride = db.Ride;
const Drv = db.Driver

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Ride.find().where('status', true);;
}

async function getById(id) {
  return await Ride.findById(id);
}

async function create(passid, driverid, userParam) {
    const pass = await Ride.findOne({ passenger: passid }).where('status', true);
    const drver = await Ride.findOne({ driver: driverid }).where('status', true);
    const suspendedDriver = await Drv.findOne({ driverid });
    // filter all rides with current driver and are ongoing OR all rides with passenger and are ongoing
    // if any of these two exists, decline request
    // otherwise create a new ride

  // validate
  if (drver || pass) throw "Driver is on an ongoing ride"
  if (
    suspendedDriver.suspended == true ) {
    throw 'Find another ride';
  }

  const finalPayload = {
    passenger: passid,
    driver: driverid,
    status: 'Ongoing',
    ...userParam
  }

  const ride = new Ride(finalPayload);

  // save ride
  await ride.save();

  return {
    ...ride.toJSON()
  }
}

async function update(id, userParam) {
  const ride = await Ride.findById(id);

  // validate
  if (!ride) throw "Ride not found";

  // copy userParam properties to ride
  Object.assign(ride, userParam);

  await ride.save();

  return {
    ...ride.toJSON()
  }
}

async function _delete(id) {
  await Ride.findByIdAndRemove(id);
}
