import { Schema, model } from 'mongoose';

export interface TopPlayCount {
    id: number,
    count: number
}

const topPlayCountSchema = new Schema<TopPlayCount>({
    id: Number,
    count: Number
});

export const TopPlayCountModel = model<TopPlayCount>("topPlayCount", topPlayCountSchema);
