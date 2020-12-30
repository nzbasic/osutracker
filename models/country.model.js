const mongoose = require("mongoose");

let countrySchema = new mongoose.Schema({
    name: String,
    abreviation: String,
    listPlayers: [
        {
            name: String
        }
    ],
    scoreHistory: [
        [
            {
                rank: String,
                song: String,
                diffName: String, 
                mods: Array,
                pp: String,
                missCount: String,
                player: String,
                id: String,
                acc: Number 
            }
        ]
    ],
    ppHistory: [
        {
            pp: Number, 
            date: Number
        }
    ]
});

const Country = mongoose.model("country", countrySchema);

module.exports = Country;