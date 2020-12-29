const mongoose = require("mongoose");

let statSchema = new mongoose.Schema({
  rank: { type: String, required: true },
  country: { type: String, required: true },
  pp: { type: String, required: true },
  plays: { type: String, required: true },
  acc: { type: String, required: true },
  timePlayed: { type: String, required: true },
  player: { type: String, required: true },
  date: { type: Number, required: true },
});

const Stat = mongoose.model("stat", statSchema);

module.exports = Stat;
