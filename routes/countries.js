import express from 'express'
import Country from '../models/Country.model.js'
import CountryStat from '../models/CountryStat.model.js'
import CountryPlays from '../models/CountryPlays.model.js'
import CountryPlayers from '../models/CountryPlayers.model.js'
const router = express.Router()

router.route("/id").get((req, res) => {
  Country.find({},{name: 1, abbreviation: 1, pp: 1, acc: 1})
    .then(countries => res.json(countries))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:name/details").get((req, res) => {
  Country.find({ name: req.params.name })
    .then(details => {
      res.json(details)
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

router.route("/:name/stats").get((req, res) => {
  CountryStat.find({ name: req.params.name })
    .then(stats => {
      res.json(stats)
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

router.route("/:name/players").get((req, res) => {
  CountryPlayers.find({ name: req.params.name })
    .then(players => {
      res.json(players)
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

router.route("/:name/plays").get((req, res) => {
  CountryPlays.find({ name: req.params.name })
    .then(plays => {
      res.json(plays)
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

export default router