const mongoose = require("mongoose");

let newPlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const NewPlayer = mongoose.model("newplayer", newPlayerSchema);

module.exports = NewPlayer;
