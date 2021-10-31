import express from "express";
import { CountryModel } from "../models/Country.model";
import { UserModel } from "../models/User.model";
import { CountryStatModel } from "../models/CountryStat.model";
import { CountryPlaysModel } from "../models/CountryPlays.model";
import { CountryPlayersModel } from "../models/CountryPlayers.model";
export const countryRouter = express.Router();

countryRouter.route("/all").get((req, res) => {
    CountryModel.find()
        .then((countries) => res.json(countries))
        .catch((err) => res.status(400).json("Error: " + err));
});

countryRouter.route("/number").get((req, res) => {
    CountryModel.countDocuments().then((count) => res.json(count));
});

countryRouter.route("/allFilter/:country").get(async (req, res) => {
    const name = req.query.name as string
    const page = parseInt(req.query.page as string);
    const order = { [name]: req.query.order };
    const country = await CountryModel.findOne(
        { name: req.params.country },
        { abbreviation: 1 }
    );
    const countryAbbreviation = country?.abbreviation;

    let users = await UserModel.find(
        { country: countryAbbreviation },
        { currentTop: 0, modsCount: 0 }
    ).sort(order)
        .collation({ locale: "en_US", numericOrdering: true })
        .limit(50)
        .skip(50 * (page - 1));

    users.forEach((user) => {
        user.rank = user.rank ?? "0";
        user.plays = user.plays ?? "0";
        user.averageObjects = user?.averageObjects ?? 0;
        user.acc = (parseFloat(user.acc) ?? 0).toFixed(2);
        user.level = parseFloat((user.level ?? 0).toFixed(1))
        user.pp = (parseFloat(user.pp) ?? 0).toFixed(1);
        user.averageObjects = user.averageObjects ?? 0;
        user.range = (user.range == "" ? 0 : user.range ?? 0).toString();
    });

    let number = await UserModel.countDocuments();
    res.json({ data: users, numberResults: number });
});

countryRouter.route("/limitedAll").get((req, res) => {
    CountryModel.find(
        {},
        {
            name: 1,
            abbreviation: 1,
            pp: 1,
            acc: 1,
            farm: 1,
            range: 1,
            averageObjects: 1,
            playerWeighting: 1,
        }
    ).then((countries) => res.json(countries))
        .catch((err) => res.status(400).json("Error: " + err));
});

countryRouter.route("/:name/details").get((req, res) => {
    CountryModel.findOne({ name: req.params.name })
        .then((details) => {
            res.json(details);
        }).catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

countryRouter.route("/:name/stats").get((req, res) => {
    CountryStatModel.find({ name: req.params.name })
        .then((stats) => {
            res.json(stats);
        }).catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

countryRouter.route("/:name/players").get((req, res) => {
    CountryPlayersModel.find({ name: req.params.name })
        .then((players) => {
            res.json(players);
        }).catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

countryRouter.route("/:name/plays").get((req, res) => {
    CountryPlaysModel.find({ name: req.params.name })
        .then((plays) => {
            res.json(plays);
        }).catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

countryRouter.route("/:abbreviation").get((req, res) => {
    CountryModel.findOne({ abbreviation: req.params.abbreviation }, { name: 1 })
        .then((country) => {
            res.json(country?.name);
        }).catch((err) => res.status(400).json("Error: " + err + req.params.abbreviation));
});
