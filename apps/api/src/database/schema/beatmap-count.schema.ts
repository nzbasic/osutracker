import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmapcounts' })
export class BeatmapCount {
  @Prop() id: string;
  @Prop() count: number;
}

export type BeatmapCountDocument = BeatmapCount & Document;
export type BeatmapCountCollection = Model<BeatmapCountDocument>;

export const BeatmapCountSchema = SchemaFactory.createForClass(BeatmapCount);
