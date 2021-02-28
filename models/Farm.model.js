import mongoose from "mongoose";

let farmSchema = new mongoose.Schema({
  name: String,
});

const Farm = mongoose.model("farm", farmSchema);

export default Farm;
