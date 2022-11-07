import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Score, ScoreSchema } from '../score.schema';

@Schema()
class PlayTime {
  @Prop({ type: Number }) date: number;
  @Prop({ type: Number }) pp: number;
}
const PlayTimeSchema = SchemaFactory.createForClass(PlayTime);

@Schema({ collection: 'users' })
export class User {
  @Prop({ type: String }) name: string;
  @Prop({ type: Number }) id: number;
  @Prop({ type: String }) country: string;
  @Prop({ type: Number }) pp: number;
  @Prop({ type: Number }) rank: number;
  @Prop({ type: Number }) acc: number;
  @Prop({ type: Number }) plays: number;
  @Prop({ type: Number }) level: number;
  @Prop({ type: Number }) range: number;
  @Prop({ type: Date }) joined: Date;
  @Prop({ type: Number }) farm: number;
  @Prop({ type: Number }) averageLength: number;
  @Prop({ type: Number }) averageObjects: number;
  @Prop({ type: [ScoreSchema] }) currentTop: Types.Array<Score>;
  @Prop({ type: [PlayTimeSchema] }) timesList: Types.Array<PlayTime>;
}

export type UserDocument = User & Document;
export type UserCollection = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
