import mongoose from "mongoose";

let countrySchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  contributors: Array,
  acc: Number,
  pp: String,
  farm: Number,
  scoresCurrent: Array,
  range: String,
  playerWeighted: Number,
});

const Country = mongoose.model("country", countrySchema);

export default Country;
