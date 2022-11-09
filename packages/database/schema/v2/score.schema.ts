import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
export class Score {
  @Prop({ type: Number }) beatmapId: number;
  @Prop({ type: Number }) beatmapSetId: number;
  @Prop({ type: Number }) acc: number;
  @Prop({ type: [String] }) mods: Types.Array<string>;
  @Prop({ type: Number }) pp: number;
  @Prop({ type: Number }) countMiss: number;
  @Prop({ type: Date }) time: Date;
  @Prop({ type: String, required: false }) player?: string;
}

export type ScoreDocument = Score & Document;
export type ScoreCollection = Model<ScoreDocument>;

export const ScoreSchema = SchemaFactory.createForClass(Score);
