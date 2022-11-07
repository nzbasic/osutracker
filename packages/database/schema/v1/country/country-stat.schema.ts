import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'countrystats' })
export class CountryStat {
  @Prop({ type: String }) name: string;
  @Prop({ type: Number }) date: number;
  @Prop({ type: String }) pp: string;
  @Prop({ type: Number }) acc: number;
  @Prop({ type: Number, required: false }) range?: number;
  @Prop({ type: Number, required: false }) farm?: number;
  @Prop({ type: Number, required: false }) playerWeighting?: number;
}

export type CountryStatDocument = CountryStat & Document;
export type CountryStatCollection = Model<CountryStatDocument>;

export const CountryStatSchema = SchemaFactory.createForClass(CountryStat);
