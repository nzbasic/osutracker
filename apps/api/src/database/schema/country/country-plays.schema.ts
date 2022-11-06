import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Score, ScoreSchema } from '../score.schema';

@Schema({ collection: 'countryplays' })
export class CountryPlays {
  @Prop() name: string;
  @Prop() date: number;
  @Prop({ type: [ScoreSchema] }) added: Types.Array<Score>;
  @Prop({ type: [ScoreSchema] }) removed: Types.Array<Score>;
}

export type CountryPlaysDocument = CountryPlays & Document;
export type CountryPlaysCollection = Model<CountryPlaysDocument>;

export const CountryPlaysSchema = SchemaFactory.createForClass(CountryPlays);
