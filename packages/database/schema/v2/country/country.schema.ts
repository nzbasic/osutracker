import { ModCount, ModCountSchema } from './../stats/mod-count.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Contributor, ContributorSchema } from './contributor.schema';
import { Score, ScoreSchema } from '../score.schema';

@Schema({ collection: 'countries' })
export class Country {
  @Prop({ type: String, unique: true }) name: string;
  @Prop({ type: String, unique: true }) abbreviation: string;
  @Prop({ type: Number }) acc: number;
  @Prop({ type: Number }) pp: number;
  @Prop({ type: Number }) farm: number;
  @Prop({ type: Number }) range: number;
  @Prop({ type: Number }) playerWeighting: number;
  @Prop({ type: Number }) averageObjects: number;
  @Prop({ type: Number }) averageLength: number;
  @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
  @Prop({ type: Number, required: false }) rank?: number;
  @Prop({ type: [ScoreSchema] }) scoresCurrent: Types.Array<Score>;
  @Prop({ type: [ContributorSchema] }) contributors: Types.Array<Contributor>;
}

export type CountryDocument = Country & Document;
export type CountryCollection = Model<CountryDocument>;

export const CountrySchema = SchemaFactory.createForClass(Country);
