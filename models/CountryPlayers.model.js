import mongoose from 'mongoose';

let countryPlayersSchema = new mongoose.Schema({
    name: String,
    date: Number,
    listPlayers: Array
});

const CountryPlayers = mongoose.model("countryPlayers", countryPlayersSchema);

export default CountryPlayers;