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

function create(req, res, next) {
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

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

// Update
function update(req, res, next) {
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
