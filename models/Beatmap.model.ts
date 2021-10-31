import { Schema, model } from 'mongoose';

export interface Beatmap {
    id: string,
    setId: string,
    name: string,
    maxCombo: string,
    objects: number,
    starRating: string,
    length: string,
    mapper: string,
}

const beatmapSchema = new Schema<Beatmap>({
    id: String,
    setId: String,
    name: String,
    maxCombo: String,
    objects: Number,
    starRating: String,
    length: String,
    mapper: String,
});

export const BeatmapModel = model<Beatmap>("beatmap", beatmapSchema);
