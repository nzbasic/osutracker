import { Schema, model } from 'mongoose';

export interface BeatmapCount {
    id: number,
    count: number
}

const beatmapCountSchema = new Schema<BeatmapCount>({
    id: Number,
    count: Number
});

export const BeatmapCountModel = model<BeatmapCount>("beatmapCount", beatmapCountSchema);
