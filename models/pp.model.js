const mongoose = require("mongoose");

let ppSchema = new mongoose.Schema({
  total: { type: String, required: true },
  players: { type: Array, required: true },
  pp: { type: Array, required: true },
});

const Pp = mongoose.model("pp", ppSchema);

module.exports = Pp;
