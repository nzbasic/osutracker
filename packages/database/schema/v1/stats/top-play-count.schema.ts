import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'topplaycounts' })
export class TopPlayCount {
  @Prop({ type: Number }) id: number;
  @Prop({ type: Number }) count: number;
}

export type TopPlayCountDocument = TopPlayCount & Document;
export type TopPlayCountCollection = Model<TopPlayCountDocument>;

export const TopPlayCountSchema = SchemaFactory.createForClass(TopPlayCount);
