import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
export class Score {
  @Prop() name: string;
  @Prop() id: string;
  @Prop() setId: string;
  @Prop({ type: [String] }) mods: Types.Array<string>;
  @Prop() pp: string;
  @Prop() missCount: string;
  @Prop() acc: number;
  @Prop() mapper: string;
  @Prop() length: string;
  @Prop() objects: number;
  @Prop() player?: string;
  @Prop() added?: boolean;
}

export type ScoreDocument = Score & Document;
export type ScoreCollection = Model<ScoreDocument>;

export const ScoreSchema = SchemaFactory.createForClass(Score);
