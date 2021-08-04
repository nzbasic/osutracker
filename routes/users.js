import express from "express";
import User from "../models/User.model.js";
import UserStat from "../models/UserStat.model.js";
import UserPlays from "../models/UserPlays.model.js";
import Country from "../models/Country.model.js";
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

router.route("/allFilter").get(async (req, res) => {
  const page = req.query.page;
  const order = { [req.query.name]: req.query.order };

  let users = await User.find({}, { currentTop: 0, modsCount: 0 })
    .sort(order)
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(50)
    .skip(50 * (page - 1));

  users.forEach((user) => {
    user.rank = user.rank ?? 0;
    user.plays = user.plays ?? 0;
    user.averageObjects = user?.averageObjects ?? 0;
    user.acc = parseFloat(user.acc ?? 0).toFixed(2);
    user.level = parseFloat(user.level ?? 0).toFixed(1);
    user.pp = parseFloat(user.pp ?? 0).toFixed(1);
    user.averageObjects = parseInt(user.averageObjects ?? 0);
    user.range = parseInt(user.range == "" ? 0 : user.range ?? 0);
  });

  //console.log(users);

  let number = await User.countDocuments();

  res.json({ data: users, numberResults: number });
  return;
});

router.route("/number").get((req, res) => {
  User.countDocuments().then((count) => res.json(count));
});

router.route("/limitedAllCountry/:country").get(async (req, res) => {
  let abbreviation = (
    await Country.findOne({ name: req.params.country }, { abbreviation: 1 })
  ).abbreviation;

  User.find(
    { country: abbreviation },
    {
      name: 1,
      id: 1,
      pp: 1,
      rank: 1,
      acc: 1,
      farm: 1,
      range: 1,
      joined: 1,
      level: 1,
      averageObjects: 1,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/all").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:name/getId").get((req, res) => {
  User.findOne({ name: req.params.name }, { id: 1 })
    .then((user) => {
      res.json(user.id);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

router.route("/:id/getName").get((req, res) => {
  User.findOne({ id: req.params.id }, { name: 1 })
    .then((user) => {
      res.json(user.name);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

router.route("/:id").get((req, res) => {
  User.find({ id: req.params.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

router.route("/:id/stats").get((req, res) => {
  UserStat.find({ id: req.params.id })
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

router.route("/:id/plays").get((req, res) => {
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
        return;
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
