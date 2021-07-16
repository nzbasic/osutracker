import express from "express";
import OverallStats from "../models/OverallStats.model.js";
import Beatmap from "../models/Beatmap.model.js";
const router = express.Router();

router.route("/").get((req, res) => {
  OverallStats.findOne({})
    .then((stats) => res.json(stats))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/farmSets").get((req, res) => {
  OverallStats.findOne({}, { setCount: 1 })
    .then((stats) => {
      let output = stats.setCount.slice(0, 727).map((count) => count.setId);
      res.json(output);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/mapset/:id").get((req, res) => {
  Beatmap.findOne({ id: req.params.id })
    .then((map) => res.json(map))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/mapsets").get(async (req, res) => {
  let result = [];

  for (const setId of req.query.arr) {
    let beatmap = await Beatmap.findOne({ setId: setId });
    result.push(beatmap);
  }

  res.json(result);
});

export default router;
