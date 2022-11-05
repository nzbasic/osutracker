import { Schema, model } from 'mongoose';

export interface MapperCount {
    mapper: string,
    count: number
}

export interface SetCount {
    setId: string,
    count: number
}

export interface ModCount {
    mods: string[]
    count: number
}

export interface OverallStats {
    mapperCount: MapperCount[],
    setCount: SetCount[],
    userStats: {
        range: number,
        acc: number,
        plays: number,
        timeJoined: number,
        farm: number,
        topPlay: string,
        pp: number,
        level: number,
        lengthPlay: number,
        objectsPlay: number,
        modsCount: ModCount[],
    },
    countryStats: {
        range: number,
        farm: number,
        pp: number,
        acc: number,
        lengthPlay: number,
        objectsPlay: number,
        modsCount: ModCount[],
    },
}

const overallStats = new Schema<OverallStats>({
    mapperCount: Array,
    setCount: Array,
    userStats: {
        range: Number,
        acc: Number,
        plays: Number,
        timeJoined: Number,
        farm: Number,
        topPlay: String,
        pp: Number,
        level: Number,
        lengthPlay: Number,
        objectsPlay: Number,
        modsCount: Array,
    },
    countryStats: {
        range: Number,
        farm: Number,
        pp: Number,
        acc: Number,
        lengthPlay: Number,
        objectsPlay: Number,
        modsCount: Array,
    },
});

export const OverallStatsModel = model<OverallStats>("overallStats", overallStats);