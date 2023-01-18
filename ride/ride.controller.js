const express = require("express");
const router = express.Router();
const userService = require("./ride.service");
const authorize = require("_helpers/authorize");
const Role = require("_helpers/role");

// routes
router.post("/ride/:passid/:driverid", create);
router.post("/:id/stop", update);
router.get("/ride/ongoing", getAll);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function create(req, res, next) {
    console.log("gtest", req.params.driverid)
  userService
    .create(req.params.passid,req.params.driverid,req.body)
    .then((user) => res.json({user}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

// Update
function update(req, res, next) {
    console.log("Hello")
  var newvalues = {status: "Done" }
  userService
    .update(req.params.id, newvalues)
    .then((message) => res.json(message))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
