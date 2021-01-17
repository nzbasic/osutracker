const router = require("express").Router();
let Country = require("../models/country.model");

router.route("/names").get((req, res) => {
  Country.find({}, { name: 1 })
    .then((countries) => res.json(countries))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/abbreviation/:country").get((req, res)=>{
    Country.find({ name: req.params.country }, { abbreviation: 1 })
        .then((country) => res.json(country))
        .catch(err => res.status(400).json("error: " + err))
})

router.route("/data/:country").get((req, res) => {
  Country.find({ name: req.params.country })
    .then((country) => {
      res.json(country);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.country));
});

router.route("/ppHistory/:country").get((req, res) => {
    Country.find({ name: req.params.country }, { ppHistory: 1 })
        .then(history => {
            res.json(history)
        })
        .catch(err => res.status(400).json("error: " + err + req.params.country))
})

router.route("/scores/:country/latest").get((req, res) => {
    Country.find({ name: req.params.country }, { scoreHistory: 1 })
        .then(history => {
            res.json(history[0].scoreHistory[history[0].scoreHistory.length-1])
        })
        .catch(err => res.status(400).json("error: " + err + req.params.country))
})

router.route("/scores/:country/all").get((req, res) => {
    Country.find({ name: req.params.country }, { scoreHistory: 1 })
        .then(history => {
            res.json(history[0].scoreHistory)
        })
        .catch(err => res.status(400).json("error: " + err + req.params.country))
})

module.exports = router;