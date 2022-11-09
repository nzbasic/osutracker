import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmapsetcounts' })
export class BeatmapSet {
  @Prop({ type: String }) setId: string;
  @Prop({ type: Number }) count: number;
  @Prop({ type: Boolean, required: false }) migrated?: boolean;
}

export type BeatmapSetDocument = BeatmapSet & Document;
export type BeatmapSetCollection = Model<BeatmapSetDocument>;

export const BeatmapSetSchema = SchemaFactory.createForClass(BeatmapSet);
