import { Schema, model } from 'mongoose';
import { Score } from './Score';

export interface UserPlays {
    name: string,
    id: string,
    date: number,
    added: Score[],
    removed: Score[], 
}

const userPlaysSchema = new Schema<UserPlays>({
    name: String,
    id: String,
    date: Number,
    added: Array,
    removed: Array,
});

export const UserPlaysModel = model<UserPlays>("userPlays", userPlaysSchema);