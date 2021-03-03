import express from "express";
import User from "../models/User.model.js";
import UserStat from "../models/UserStat.model.js";
import UserPlays from "../models/UserPlays.model.js";
import osu from "node-osu";
import dotenv from "dotenv";
dotenv.config();

const osuApi = new osu.Api(process.env.OSU_API_KEY, {
  // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
  notFoundAsError: false, // Throw an error on not found instead of returning nothing. (default: true)
  completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
  parseNumeric: false, // Parse numeric values into numbers/floats, excluding ids
});

const router = express.Router();

router.route("/id").get((req, res) => {
  User.find(
    {},
    {
      currentTop: 0,
      joined: 0,
      level: 0,
      plays: 0,
      range: 0,
      farm: 0,
      _id: 0,
      __v: 0,
      country: 0,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/id/:id").get((req, res) => {
  User.find({ id: req.params.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

router.route("/id/:id/stats").get((req, res) => {
  UserStat.find({ id: req.params.id })
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

router.route("/id/:id/plays").get((req, res) => {
  UserPlays.find({ id: req.params.id })
    .then((plays) => {
      res.json(plays);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

router.route("/add").post(async (req, res) => {
  await osuApi.getUser({ u: req.body.name }).then(async (user) => {
    if (user != []) {
      let checkExists = await User.find({ id: user.id });
      if (checkExists.length > 0) {
        res.json("Already Exists");
      }

      let newUser = new User({
        name: user.name,
        id: user.id,
        url: "http://s.ppy.sh/a/" + user.id,
        country: user.country,
        pp: user.pp.raw,
        rank: user.pp.rank,
        acc: user.accuracy,
        plays: user.counts.plays,
        level: user.level,
        range: "",
        joined: user.joinDate.getTime(),
        currentTop: [],
        farm: -1,
      });
      //console.log(newUser)
      newUser.save();
      res.json("Added");
    } else res.json("Not Found");
  });
});

export default router;
