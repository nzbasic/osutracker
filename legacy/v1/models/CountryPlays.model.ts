import { Schema, model } from 'mongoose';
import { Score } from './Score';

export interface CountryPlays {
    name: string,
    date: number,
    added: Score[],
    removed: Score[]
}

const countryPlaysSchema = new Schema<CountryPlays>({
    name: String,
    date: Number,
    added: Array,
    removed: Array,
});

export const CountryPlaysModel = model<CountryPlays>("countryPlays", countryPlaysSchema);