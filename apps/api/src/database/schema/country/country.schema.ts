import { ModCount, ModCountSchema } from './../stats/mod-count.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Contributor, ContributorSchema } from './contributor.schema';
import { Score, ScoreSchema } from '../score.schema';

@Schema({ collection: 'countries' })
export class Country {
  @Prop() name: string;
  @Prop() abbreviation: string;
  @Prop() acc: number;
  @Prop() pp: string;
  @Prop() farm: number;
  @Prop() range: string;
  @Prop() playerWeighting: number;
  @Prop() averageObjects: number;
  @Prop() averageLength: number;
  @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
  @Prop({ required: false }) rank?: number;
  @Prop({ type: [ScoreSchema] }) scoresCurrent: Types.Array<Score>;
  @Prop({ type: [ContributorSchema] }) contributors: Types.Array<Contributor>;
}

export type CountryDocument = Country & Document;
export type CountryCollection = Model<CountryDocument>;

export const CountrySchema = SchemaFactory.createForClass(Country);
