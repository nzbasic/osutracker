import express from "express";
import { OverallStatsModel } from "../models/OverallStats.model";
import { HistoricTopModel } from '../models/HistoricTop.model'
import { BeatmapModel } from "../models/Beatmap.model";
export const statsRouter = express.Router();

statsRouter.route("/historicTop").get((req, res) => {
    HistoricTopModel.find().then(top => res.json(top))
})

statsRouter.route("/").get((req, res) => {
  OverallStatsModel.findOne({})
    .then((stats) => res.json(stats))
    .catch((err) => res.status(400).json("Error: " + err));
});

statsRouter.route("/farmSets").get((req, res) => {
  OverallStatsModel.findOne({}, { setCount: 1 })
    .then((stats) => {
      let output = (stats?.setCount??[]).slice(0, 727).map((count) => count.setId);
      res.json(output);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

statsRouter.route("/mapset/:id").get((req, res) => {
  BeatmapModel.findOne({ id: req.params.id })
    .then((map) => res.json(map))
    .catch((err) => res.status(400).json("Error: " + err));
});

statsRouter.route("/mapsets").get(async (req, res) => {
  let result = [];
  const sets = req.query.arr as string[]

  for (const setId of sets) {
    let beatmap = await BeatmapModel.findOne({ setId: setId }, { name: 1, mapper: 1 });
    result.push(beatmap);
  }

  res.json(result);
});
