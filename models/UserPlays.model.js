import mongoose from "mongoose";

let userPlaysSchema = new mongoose.Schema({
  name: String,
  id: String,
  date: Number,
  added: Array,
  removed: Array,
});

const UserPlays = mongoose.model("userPlays", userPlaysSchema);

export default UserPlays;
