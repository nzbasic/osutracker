import express from "express";
import { OverallStatsModel } from "../models/OverallStats.model";
import { HistoricTopModel } from '../models/HistoricTop.model'
import { BeatmapModel } from "../models/Beatmap.model";
import { PPBarrierRes } from "../interfaces/stats";
import { PPBarrier, PPBarrierModel } from "../models/PPBarrier.model";
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

statsRouter.route("/ppBarrier").get(async (req, res) => {
  const barriers = await PPBarrierModel.find()
  const output: PPBarrierRes[] = []

  for (const barrier of barriers) {
    const list: { name: string, id: string, count: number }[] = []
    const number = barrier.number
    const limit = barrier.list.slice(0, 100)
    for (const count of limit) {
      const beatmap = await BeatmapModel.findOne({ id: count.setId })
      if (beatmap) {
        list.push({ name: beatmap.name, id: count.setId, count: count.count })
      }
    }
    output.push({ number: number.valueOf(), list })
  }

  res.json(output)
})

statsRouter.route("/mapsets").get(async (req, res) => {
  let result = [];
  const sets = req.query.arr as string[]

  for (const setId of sets) {
    let beatmap = await BeatmapModel.findOne({ setId: setId }, { name: 1, mapper: 1 });
    result.push(beatmap);
  }

  res.json(result);
});
