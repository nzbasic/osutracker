import { BeatmapSet, BeatmapSetSchema } from "./../beatmap-set.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import { ModCount, ModCountSchema } from "./mod-count.schema";

@Schema()
class CountriesStats {
    @Prop({ type: Number }) range: number;
    @Prop({ type: Number }) farm: number;
    @Prop({ type: Number }) pp: number;
    @Prop({ type: Number }) acc: number;
    @Prop({ type: Number }) lengthPlay: number;
    @Prop({ type: Number }) objectsPlay: number;
    @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
}
const CountriesStatsSchema = SchemaFactory.createForClass(CountriesStats);

@Schema()
class MapperCount {
    @Prop({ type: String }) mapper: string;
    @Prop({ type: Number }) count: number;
}
const MapperCountSchema = SchemaFactory.createForClass(MapperCount);

@Schema()
class UsersStats {
    @Prop({ type: Number }) range: number;
    @Prop({ type: Number }) acc: number;
    @Prop({ type: Number }) plays: number;
    @Prop({ type: Number }) timeJoined: number;
    @Prop({ type: Number }) farm: number;
    @Prop({ type: String }) topPlay: string;
    @Prop({ type: Number }) pp: number;
    @Prop({ type: Number }) level: number;
    @Prop({ type: Number }) lengthPlay: number;
    @Prop({ type: Number }) objectsPlay: number;
    @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
    @Prop({ type: Boolean, required: false }) migrated?: boolean;
}
const UsersStatsSchema = SchemaFactory.createForClass(UsersStats);

@Schema({ collection: "overallstats" })
export class OverallStats {
    @Prop({ type: [MapperCountSchema] }) mapperCount: Types.Array<MapperCount>;
    @Prop({ type: [BeatmapSetSchema] }) setCount: Types.Array<BeatmapSet>;
    @Prop({ type: UsersStatsSchema }) userStats: UsersStats;
    @Prop({ type: CountriesStatsSchema }) countryStats: CountriesStats;
}

export type OverallStatsDocument = OverallStats & Document;
export type OverallStatsCollection = Model<OverallStatsDocument>;

export const OverallStatsSchema = SchemaFactory.createForClass(OverallStats);
