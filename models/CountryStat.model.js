import mongoose from "mongoose";

let countryStatSchema = new mongoose.Schema({
  name: String,
  date: Number,
  pp: String,
  acc: Number,
});

const CountryStat = mongoose.model("countryStat", countryStatSchema);

export default CountryStat;
