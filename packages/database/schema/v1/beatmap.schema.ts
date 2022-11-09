import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmaps' })
export class Beatmap {
  @Prop({ type: String }) id: string;
  @Prop({ type: String }) setId: string;
  @Prop({ type: String }) name: string;
  @Prop({ type: String }) maxCombo: string;
  @Prop({ type: Number }) objects: number;
  @Prop({ type: String }) starRating: string;
  @Prop({ type: String }) length: string;
  @Prop({ type: String }) mapper: string;
  @Prop({ type: Number }) count: number;
  @Prop({ type: Boolean, required: false }) migrated?: boolean;
}

export type BeatmapDocument = Beatmap & Document;
export type BeatmapCollection = Model<BeatmapDocument>;

export const BeatmapSchema = SchemaFactory.createForClass(Beatmap);
