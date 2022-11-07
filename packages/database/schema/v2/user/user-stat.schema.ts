import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'userstats' })
export class UserStat {
  @Prop({ type: Number }) rank: number;
  @Prop({ type: Number }) pp: number;
  @Prop({ type: Number }) plays: number;
  @Prop({ type: Number }) acc: number;
  @Prop({ type: Number }) playerId: number;
  @Prop({ type: String }) player: string;
  @Prop({ type: Date }) date: Date;
  @Prop({ type: Number, required: false }) countryRank?: number;
  @Prop({ type: Number, required: false }) farm?: number;
  @Prop({ type: Number, required: false }) range?: number;
  @Prop({ type: Number, required: false }) score?: number;
}

export type UserStatDocument = UserStat & Document;
export type UserStatCollection = Model<UserStatDocument>;

export const UserStatSchema = SchemaFactory.createForClass(UserStat);
