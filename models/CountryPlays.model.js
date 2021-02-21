import mongoose from 'mongoose';

let countryPlaysSchema = new mongoose.Schema({
    name: String,
    date: Number,
    added: Array,
    removed: Array
});

const CountryPlays = mongoose.model("countryPlays", countryPlaysSchema);

export default CountryPlays;