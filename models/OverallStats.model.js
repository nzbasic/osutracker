import mongoose from "mongoose";

let overallStats = new mongoose.Schema({
  mapperCount: Array,
  setCount: Array,
  userStats: {
    range: Number,
    acc: Number,
    plays: Number,
    timeJoined: Number,
    farm: Number,
    topPlay: String,
    pp: Number,
    level: Number,
    lengthPlay: Number,
    objectsPlay: Number,
    modsCount: Array,
  },
  countryStats: {
    range: Number,
    farm: Number,
    pp: Number,
    acc: Number,
    lengthPlay: Number,
    objectsPlay: Number,
    modsCount: Array,
  },
});

const OverallStats = mongoose.model("overallStats", overallStats);

export default OverallStats;
