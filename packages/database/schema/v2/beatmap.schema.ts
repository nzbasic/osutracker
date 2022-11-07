import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmaps' })
export class Beatmap {
  @Prop({ index: 'desc', unique: true, type: Number }) id: number;
  @Prop({ index: 'desc', type: Number }) setId: number;
  @Prop({ type: Number, nullable: true }) count: number | null;
  @Prop({ type: String }) status: string;
  @Prop({ type: String }) mapper: string;
  @Prop({ type: Number }) mapperId: number;
  @Prop({ type: String }) title: string;
  @Prop({ type: String }) artist: string;
  @Prop({ type: String }) difficulty: string;
  @Prop({ type: Number }) stars: number;
  @Prop({ type: Number }) od: number;
  @Prop({ type: Number }) ar: number;
  @Prop({ type: Number }) cs: number;
  @Prop({ type: Number }) hp: number;
  @Prop({ type: Number, nullable: true }) bpm: number | null;
  @Prop({ type: Number }) maxCombo: number;
  @Prop({ type: Number }) countCircles: number;
  @Prop({ type: Number }) countSliders: number;
  @Prop({ type: Number }) countSpinners: number;
  @Prop({ type: Number }) hitLength: number;
  @Prop({ type: Number }) totalLength: number;
  @Prop({ type: Number }) passcount: number;
  @Prop({ type: Number }) playcount: number;
  @Prop({ type: String, nullable: true }) checksum: string | null;
  @Prop({ type: Date }) ranked: Date;
}

export type BeatmapDocument = Beatmap & Document;
export type BeatmapCollection = Model<BeatmapDocument>;
export const BeatmapSchema = SchemaFactory.createForClass(Beatmap);
