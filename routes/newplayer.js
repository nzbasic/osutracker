const router = require("express").Router();
const NewPlayer = require("../models/newplayer.model");
const Player = require("../models/player.model");
const osu = require("node-osu");

const osuApi = new osu.Api(process.env.OSU_API_KEY, {
  // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
  notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
  completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
  parseNumeric: false, // Parse numeric values into numbers/floats, excluding ids
});
const verify = require("../util/verify");
const axios = require("axios");

// for admin screen
router.route("/").get((req, res) => {
  NewPlayer.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  let name = req.body.player;
  if (!name) {
    res.status(400).send("invalid");
  }
  NewPlayer.find({ name: name }).then((players) => {
    if (players.length == 0) {
      let newPlayer = NewPlayer({
        name: name,
      });
      newPlayer.save();
      res.send("success");
    } else {
      res.status(406).send("User already in database");
    }
  });
});

router.route("/change").post((req, res) => {
  // verify admin token
  let token = req.body.token;
  if (!token) {
    res.status(400).send("invalid");
  }
  verify(token).then((response) => {
    if (response) {
      let name = req.body.player;
      NewPlayer.findOneAndDelete({ name: name }, function (err) {
        if (err) console.log(err);
        console.log("successful deletion");
      });

      osuApi.getUser({ u: name }).then((user) => {
        let player = new Player({
          name: user.name,
          id: user.id,
          url: "http://s.ppy.sh/a/" + user.id,
          country: user.country,
          pp: user.pp.raw,
          rank: user.pp.rank,
          date: new Date().getTime(),
        });
        player.save();
      });
      res.send("success");
    } else {
      res.status(401).send("unauthorized");
    }
  });
});

router.route("/remove").post((req, res) => {
  let token = req.body.token;
  if (!token) {
    res.status(400).send("invalid");
  }
  verify(token).then((response) => {
    if (response) {
      let name = req.body.player;
      NewPlayer.findOneAndDelete({ name: name }, function (err) {
        if (err) console.log(err);
        console.log("successful deletion");
      });
      res.send("success");
    } else {
      res.status(401).send("unauthorized");
    }
  });
});

module.exports = router;
