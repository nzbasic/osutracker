import { Schema, model } from 'mongoose';

export interface BeatmapSetCount {
    setId: number,
    count: number
}

const beatmapSetCountSchema = new Schema<BeatmapSetCount>({
    setId: Number,
    count: Number
});

export const BeatmapSetCountModel = model<BeatmapSetCount>("beatmapSetCount", beatmapSetCountSchema);
