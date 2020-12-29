const router = require("express").Router();
let Play = require("../models/play.model");

router.route("/").get((req, res) => {
  Play.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
