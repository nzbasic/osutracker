import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmapsetcounts' })
export class BeatmapSet {
  @Prop() setId: string;
  @Prop() count: number;
}

export type BeatmapSetDocument = BeatmapSet & Document;
export type BeatmapSetCollection = Model<BeatmapSetDocument>;

export const BeatmapSetSchema = SchemaFactory.createForClass(BeatmapSet);
