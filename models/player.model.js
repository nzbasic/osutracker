const mongoose = require("mongoose");

let playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  url: { type: String, required: true },
  country: { type: String, required: true },
  pp: { type: String, required: true },
  rank: { type: String, required: true },
  date: { type: Number, required: true },
});

const Player = mongoose.model("player", playerSchema);

module.exports = Player;
