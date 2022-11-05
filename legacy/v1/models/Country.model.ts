import { Schema, model } from 'mongoose';
import { ModCount } from './OverallStats.model';
import { Score } from './Score';

export interface Contributor {
    name: string
    pp: number
}

export interface Country {
    name: string,
    abbreviation: string,
    contributors: Contributor[],
    acc: number,
    pp: string,
    farm: number,
    scoresCurrent: Score[],
    range: string,
    playerWeighting: number,
    averageObjects: number,
    averageLength: number,
    modsCount: ModCount[],
    rank?: number
}

const countrySchema = new Schema<Country>({
    name: String,
    abbreviation: String,
    contributors: Array,
    acc: Number,
    pp: String,
    farm: Number,
    scoresCurrent: Array,
    range: String,
    playerWeighting: Number,
    averageObjects: Number,
    averageLength: Number,
    modsCount: Array,
});

export const CountryModel = model<Country>("country", countrySchema);
