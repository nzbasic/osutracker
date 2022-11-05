import { Schema, model } from 'mongoose';

export interface CountryPlayer {
    name: string
    pp: string
}

export interface CountryPlayers {
    name: string,
    date: number,
    listPlayers: CountryPlayer[],
    mark: number,
}

const countryPlayersSchema = new Schema<CountryPlayers>({
    name: String,
    date: Number,
    listPlayers: Array,
    mark: Number,
});

export const CountryPlayersModel = model<CountryPlayers>("countryPlayers", countryPlayersSchema);
