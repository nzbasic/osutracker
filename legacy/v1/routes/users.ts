import { OverallStatsModel } from './../models/OverallStats.model';
import express from "express";
import { UserModel } from "../models/User.model";
import { UserStatModel } from "../models/UserStat.model";
import { UserPlaysModel } from "../models/UserPlays.model";
import { CountryModel } from "../models/Country.model";
import osu from "node-osu";
import dotenv from "dotenv";
import { BeatmapModel } from '../models/Beatmap.model';
dotenv.config();

const osuApi = new osu.Api(process.env.OSU_API_KEY??"", {
  // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
  notFoundAsError: false, // Throw an error on not found instead of returning nothing. (default: true)
  completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
  parseNumeric: false, // Parse numeric values into numbers/floats, excluding ids
});

export const userRouter = express.Router();

userRouter.route("/limitedAll").get((req, res) => {
  UserModel.find({}, { name: 1, pp: 1, acc: 1, farm: 1, range: 1 })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/topUserIds").get((req, res) => {
  UserModel.find({}, { id: 1 })
    .sort({ pp: "desc" })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(10)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/allFilter").get(async (req, res) => {
  const page = parseInt(req.query.page as string);
  const name = req.query.name as string
  const order = { [name]: req.query.order };

  let users = await UserModel.find({}, { currentTop: 0, modsCount: 0 })
    .sort(order)
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

userRouter.route("/number").get((req, res) => {
  UserModel.countDocuments().then((count) => res.json(count));
});

userRouter.route("/limitedAllCountry/:country").get(async (req, res) => {
  let abbreviation = (
    await CountryModel.findOne({ name: req.params.country }, { abbreviation: 1 })
  )?.abbreviation;

  UserModel.find(
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

userRouter.route("/all").get((req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

userRouter.route("/:name/getId").get((req, res) => {
  UserModel.findOne({ name: req.params.name }, { id: 1 })
    .then((user) => {
      res.json(user?.id);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.name));
});

userRouter.route("/:id/getName").get((req, res) => {
  UserModel.findOne({ id: req.params.id }, { name: 1 })
    .then((user) => {
      res.json(user?.name);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

userRouter.route("/:id").get((req, res) => {
  UserModel.findOne({ id: req.params.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

userRouter.route("/:id/stats").get((req, res) => {
  UserStatModel.find({ id: req.params.id })
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

userRouter.route("/:id/plays").get((req, res) => {
  UserPlaysModel.find({ id: req.params.id })
    .then((plays) => {
      res.json(plays);
    })
    .catch((err) => res.status(400).json("Error: " + err + req.params.id));
});

userRouter.route("/add").post(async (req, res) => {
  const checkExists = await UserModel.findOne({ name: req.body.name });
  if (checkExists) {
    res.status(409).json()
    return;
  }

  await osuApi.getUser({ u: req.body.name }).then(async (user) => {
    if (user) {
      const farmSets = await OverallStatsModel.findOne({}, { setCount: 1 })
      const scores = await osuApi.getUserBest({ u: req.body.name, limit: 100 })
      let farm = 0

      for (const score of scores) {
        if (score.beatmapId && farmSets) {
          const map = await BeatmapModel.findOne({ id: score.beatmapId as string })
          if (map) {
            if (farmSets.setCount.find(x => x.setId == map.setId)) {
              farm += 1
            }
          }
        }
      }

      await new UserModel({
        name: user.name,
        id: user.id,
        url: "http://s.ppy.sh/a/" + user.id,
        country: user.country,
        pp: user.pp.raw,
        rank: user.pp.rank,
        acc: user.accuracy,
        plays: user.counts.plays,
        level: user.level,
        range: scores.length ? scores[0].pp - scores[scores.length-1].pp : null,
        joined: (user.joinDate as Date).getTime(),
        currentTop: [],
        farm: farm,
      }).save()

      await new UserStatModel({
        id: user.id,
        pp: user.pp.raw,
        rank: user.pp.rank,
        acc: user.accuracy,
        plays: user.counts.plays,
        score: user.scores.total,
        countryRank: user.pp.countryRank,
        range: scores.length ? scores[0].pp - scores[scores.length-1].pp : null,
        level: user.level,
        date: new Date().getTime()
      }).save()

      res.status(201).json()
    } 
  }).catch(err => res.status(404).json());
});
