const mongoose = require("mongoose");

let playSchema = new mongoose.Schema({
  rank: { type: String, required: true },
  song: { type: String, required: true },
  diffName: { type: String, required: true },
  mods: { type: Array, required: true },
  pp: { type: String, required: true },
  missCount: { type: String, required: true },
  player: { type: String, required: true },
  id: { type: String, required: true },
  acc: { type: Number, required: true },
});

const Play = mongoose.model("play", playSchema);

module.exports = Play;
