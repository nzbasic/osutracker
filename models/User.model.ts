import { Schema, model } from 'mongoose';
import { Score } from './Score';

export interface User {
    name: string,
    id: string,
    url: string,
    country: string,
    pp: string,
    rank: string,
    acc: string,
    plays: string,
    level: number,
    range: string,
    joined: number,
    currentTop: Score[],
    farm: number,
    averageLength: number,
    averageObjects: number,
}

const userSchema = new Schema<User>({
    name: String,
    id: String,
    url: String,
    country: String,
    pp: String,
    rank: String,
    acc: String,
    plays: String,
    level: Number,
    range: String,
    joined: Number,
    currentTop: Array,
    farm: Number,
    averageLength: Number,
    averageObjects: Number,
});

export const UserModel = model<User>("user", userSchema);