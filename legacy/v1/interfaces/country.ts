import { CountryPlayers } from "../models/CountryPlayers.model";

export interface CountryPlayersRes {
    data: CountryPlayers
}

export interface CountriesLimitedRes {
    name: string,
    abbreviation: string,
    pp: 1,
    acc: 1,
    farm: 1,
    range: 1,
    averageObjects: 1,
    playerWeighting: 1,
}