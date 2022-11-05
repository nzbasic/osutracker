import { Schema, model } from 'mongoose';

export interface UserStat {
    rank: string,
    pp: string,
    plays: string,
    acc: string,
    player: string,
    date: number,
    id: string,
    countryRank?: number,
    farm?: number,
    range?: number,
    score?: number,
}

const userStatSchema = new Schema<UserStat>({
    rank: String,
    pp: String,
    plays: String,
    acc: String,
    player: String,
    date: Number,
    id: String,
    countryRank: Number,
    farm: Number,
    range: Number,
    score: Number
});

export const UserStatModel = model<UserStat>("userstat", userStatSchema);