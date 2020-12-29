const router = require("express").Router();
let Stat = require("../models/stat.model");

router.route("/").get((req, res) => {
  Stat.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  const query = {
    player: { $regex: new RegExp(`^${req.params.id}$`), $options: "i" },
  };
  Stat.find(query)
    .then((stats) => res.json(stats))
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

module.exports = router;
