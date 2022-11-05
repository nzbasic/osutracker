import { Schema, model } from 'mongoose';

export interface CountryStat {
    name: string,
    date: number,
    pp: string,
    acc: number,
    range?: number,
    farm?: number,
    playerWeighting?: number,
}

const countryStatSchema = new Schema<CountryStat>({
    name: String,
    date: Number,
    pp: String,
    acc: Number,
    range: Number,
    farm: Number,
    playerWeighting: Number,
});

export const CountryStatModel = model<CountryStat>("countryStat", countryStatSchema);