import { BeatmapSet, BeatmapSetSchema } from './../beatmap-set.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { ModCount, ModCountSchema } from './mod-count.schema';

@Schema()
class CountriesStats {
  range: number;
  farm: number;
  pp: number;
  acc: number;
  lengthPlay: number;
  objectsPlay: number;
  @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
}
const CountriesStatsSchema = SchemaFactory.createForClass(CountriesStats);

@Schema()
class MapperCount {
  @Prop() mapper: string;
  @Prop() count: number;
}
const MapperCountSchema = SchemaFactory.createForClass(MapperCount);

@Schema()
class UsersStats {
  @Prop() range: number;
  @Prop() acc: number;
  @Prop() plays: number;
  @Prop() timeJoined: number;
  @Prop() farm: number;
  @Prop() topPlay: string;
  @Prop() pp: number;
  @Prop() level: number;
  @Prop() lengthPlay: number;
  @Prop() objectsPlay: number;
  @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
}
const UsersStatsSchema = SchemaFactory.createForClass(UsersStats);

@Schema({ collection: 'overallstats' })
export class OverallStats {
  @Prop({ type: [MapperCountSchema] }) mapperCount: Types.Array<MapperCount>;
  @Prop({ type: [BeatmapSetSchema] }) setCount: Types.Array<BeatmapSet>;
  @Prop({ type: UsersStatsSchema }) userStats: UsersStats;
  @Prop({ type: CountriesStatsSchema }) countryStats: CountriesStats;
}

export type OverallStatsDocument = OverallStats & Document;
export type OverallStatsCollection = Model<OverallStatsDocument>;

export const OverallStatsSchema = SchemaFactory.createForClass(OverallStats);
