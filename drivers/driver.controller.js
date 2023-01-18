const express = require("express");
const router = express.Router();
const driverService = require("./driver.service");
const authorize = require("_helpers/authorize");
const Role = require("_helpers/role");

// routes
router.post("/login", authenticate);
router.post("/register", register);
router.post("/driver/:id/suspend", suspend)
router.get("/all", getAll);
router.get("/:id", getById);
router.delete("/driver/:id/suspend", _delete);

module.exports = router;

function authenticate(req, res, next) {
    console.log("Evans")
  driverService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  driverService
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  driverService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  driverService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
    console.log("Mwongera")
  driverService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  driverService
    .update(req.params.id, req.body)
    .then(() => res.json({message: '204 OK'}))
    .catch((err) => next(err));
}

function suspend(req, res, next) {
    var newvalues = {suspended: "true" }
    driverService
      .update(req.params.id, newvalues)
      .then((message) => res.json({message: '204 OK'}))
      .catch((err) => next(err));
  }

function _delete(req, res, next) {
    var newvalues = {suspended: "false" }
  driverService
    .update(req.params.id, newvalues)
    .then((message) => res.json({message: '204 OK'}))
    .catch((err) => next(err));
}
