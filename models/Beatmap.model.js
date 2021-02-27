import mongoose from 'mongoose';

let beatmapSchema = new mongoose.Schema({
    id: String,
    setId: String,
    name: String,
    maxCombo: String,
    objects: Number,
    starRating: String,
    length: String,
    mapper: String,
});

const Beatmap = mongoose.model("beatmap", beatmapSchema);

export default Beatmap;
