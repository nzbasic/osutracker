import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Score, ScoreSchema } from '../score.schema';

@Schema()
class PlayTime {
  @Prop() date: number;
  @Prop() pp: number;
}
const PlayTimeSchema = SchemaFactory.createForClass(PlayTime);

@Schema({ collection: 'users' })
export class User {
  name: string;
  id: string;
  url: string;
  country: string;
  pp: string;
  rank: string;
  acc: string;
  plays: string;
  level: number;
  range: string;
  joined: number;
  farm: number;
  averageLength: number;
  averageObjects: number;
  @Prop({ type: [ScoreSchema] }) currentTop: Types.Array<Score>;
  @Prop({ type: [PlayTimeSchema] }) timesList: Types.Array<PlayTime>;
}

export type UserDocument = User & Document;
export type UserCollection = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
