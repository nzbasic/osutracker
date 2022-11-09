import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmapcounts' })
export class BeatmapCount {
  @Prop({ type: String }) id: string;
  @Prop({ type: Number }) count: number;
  @Prop({ type: Boolean, required: false }) migrated?: boolean;
}

export type BeatmapCountDocument = BeatmapCount & Document;
export type BeatmapCountCollection = Model<BeatmapCountDocument>;

export const BeatmapCountSchema = SchemaFactory.createForClass(BeatmapCount);
