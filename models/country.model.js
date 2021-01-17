const mongoose = require('mongoose')

let countrySchema = new mongoose.Schema({
    name: String,
    abbreviation: String,
    listPlayers: [
        {
            name: String
        }
    ],
    scoreHistory: [
        [
            {
                name: String,
                id: String,
                setId: String,
                mods: Array,
                pp: String,
                missCount: String,
                acc: Number,
                player: String
            }
        ]
    ],
    ppHistory: [
        {
            total: Number,
            contributors: Array,
            date: Number
        }
    ]
})

const Country = mongoose.model('country', countrySchema) 

module.exports = Country