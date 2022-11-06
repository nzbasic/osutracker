import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'countrystats' })
export class CountryStat {
  @Prop() name: string;
  @Prop() date: number;
  @Prop() pp: string;
  @Prop() acc: number;
  @Prop() range?: number;
  @Prop() farm?: number;
  @Prop() playerWeighting?: number;
}

export type CountryStatDocument = CountryStat & Document;
export type CountryStatCollection = Model<CountryStatDocument>;

export const CountryStatSchema = SchemaFactory.createForClass(CountryStat);
