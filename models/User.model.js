import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name: String,
  id: String,
  url: String,
  country: String,
  pp: String,
  rank: String,
  acc: String,
  plays: String,
  level: Number,
  range: String,
  joined: Number,
  currentTop: Array,
  farm: Number,
  averageLength: Number,
  averageObjects: Number,
});

const User = mongoose.model("user", userSchema);

export default User;
