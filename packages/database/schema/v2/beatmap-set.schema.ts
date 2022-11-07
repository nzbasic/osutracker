import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmapsets' })
export class BeatmapSet {
  @Prop({ type: Number, unique: true, index: 'desc' }) id: number;
  @Prop({ type: Number, nullable: true }) count: number | null;
  @Prop({ type: Date }) ranked: Date;
}

export type BeatmapSetDocument = BeatmapSet & Document;
export type BeatmapSetCollection = Model<BeatmapSetDocument>;

export const BeatmapSetSchema = SchemaFactory.createForClass(BeatmapSet);
