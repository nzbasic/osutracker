const mongoose = require('mongoose')

let beatmapSchema = new mongoose.Schema({
    id: String,
    setId: String,
    name: String,
    maxCombo: String,
    objects: Number,
    starRating: String,
    length: String
})

const Beatmap = mongoose.model('beatmap', beatmapSchema)

module.exports = Beatmap