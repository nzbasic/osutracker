import express from "express";
import { OverallStatsModel } from "../models/OverallStats.model";
import { HistoricTopModel } from '../models/HistoricTop.model'
import { BeatmapModel } from "../models/Beatmap.model";
import { PPBarrierRes } from "../interfaces/stats";
import { PPBarrier, PPBarrierModel } from "../models/PPBarrier.model";
import { BeatmapCountModel } from "../models/BeatmapCount.model";
export const statsRouter = express.Router();

const parseValidInteger = (number: string): number => {
  const parsed = parseInt(number);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

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
  const numberQuery = req.query?.number as string
  let number: number = 0

  const possibleNumbers: number[] = []
  const numbers = await PPBarrierModel.find({}, { number: 1 })
  for (const number of numbers) {
    possibleNumbers.push(number.number.valueOf())
  }
  possibleNumbers.sort((a, b) => a - b)

  if (numberQuery) {  
    const validation = parseValidInteger(numberQuery)
    if (!validation) {
      res.status(400).json("Invalid number, expected non zero integer")
      return
    } else {
      number = validation
      if (!possibleNumbers.includes(number)) {
        res.status(400).json("Invalid number, not found in database. Possible values are " + possibleNumbers.join(", "))
        return
      }
    }
  } 

  let barriers: PPBarrier[]  = []
  if (number) {
    barriers = await PPBarrierModel.find({ number })
  } else {
    barriers = await PPBarrierModel.find({})
  }

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

  if (number) {
    res.json(output.pop())
  } else {
    res.json(output)
  }
})

statsRouter.route("/idCounts").get(async (req, res) => {
  const limit = req.query?.limit as string
  const offset = req.query?.offset as string
  let limitNum: number = 100
  let offsetNum: number = 0

  if (limit) {
    const validation = parseValidInteger(limit)
    if (!validation) {
      res.status(400).json("Invalid limit, expected non zero integer")
      return
    } else {
      limitNum = validation
    }
  }

  if (offset) {
    const validation = parseValidInteger(offset)
    if (!validation) {
      res.status(400).json("Invalid offset, expected non zero integer")
      return
    } else {
      offsetNum = validation
    }
  }

  if (!limit) {
    limitNum = await BeatmapCountModel.countDocuments()
  }

  const counts = await BeatmapCountModel
    .find({}, { _id: 0, id: 1, count: 1 })
    .sort({ count: -1 })
    .skip(offsetNum)
    .limit(limitNum)

  res.json(counts)
})

statsRouter.route("/idCount/:id").get(async (req, res) => { 
  // get number from id param
  const id = req.params.id as string
  const number = parseInt(id)
  if (isNaN(number)) {
    res.status(400).json("Invalid id, expected non zero integer")
    return
  }

  const count = await BeatmapCountModel.findOne({ id: number })
  res.json(count?.count??0)
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
