import express from "express";
import Country from "../models/Country.model.js";
import User from "../models/User.model.js";
import CountryStat from "../models/CountryStat.model.js";
import CountryPlays from "../models/CountryPlays.model.js";
import CountryPlayers from "../models/CountryPlayers.model.js";
const router = express.Router();

router.route("/all").get((req, res) => {
  Country.find()
    .then((countries) => res.json(countries))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/number").get((req, res) => {
  Country.countDocuments().then((count) => res.json(count));
});

router.route("/allFilter/:country").get(async (req, res) => {
  const page = req.query.page;
  const order = { [req.query.name]: req.query.order };
  const country = await Country.findOne(
    { name: req.params.country },
    { abbreviation: 1 }
  );
  const countryAbbreviation = country.abbreviation;

  let users = await User.find(
    { country: countryAbbreviation },
    { currentTop: 0, modsCount: 0 }
  )
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

  let number = await User.countDocuments();

  res.json({ data: users, numberResults: number });
  return;
});

router.route("/limitedAll").get((req, res) => {
  Country.find(
    {},
    {
      name: 1,
      abbreviation: 1,
      pp: 1,
      acc: 1,
      farm: 1,
      range: 1,
      averageObjects: 1,
    }
  )
    .then((countries) => res.json(countries))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:name/details").get((req, res) => {
  Country.find({ name: req.params.name })
    .then((details) => {
      res.json(details);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

router.route("/:name/stats").get((req, res) => {
  CountryStat.find({ name: req.params.name })
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

router.route("/:name/players").get((req, res) => {
  CountryPlayers.find({ name: req.params.name })
    .then((players) => {
      res.json(players);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

router.route("/:name/plays").get((req, res) => {
  CountryPlays.find({ name: req.params.name })
    .then((plays) => {
      res.json(plays);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

router.route("/:abbreviation").get((req, res) => {
  Country.findOne({ abbreviation: req.params.abbreviation }, { name: 1 })
    .then((country) => {
      res.json(country.name);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

export default router;
