const router = require("express").Router();
let Player = require("../models/player.model");

router.route("/").get((req, res) => {
  Player.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Player.find({ name: req.params.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

module.exports = router;
