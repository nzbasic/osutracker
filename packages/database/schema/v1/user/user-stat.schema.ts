import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'userstats' })
export class UserStat {
  @Prop({ type: String }) rank: string;
  @Prop({ type: String }) pp: string;
  @Prop({ type: String }) plays: string;
  @Prop({ type: String }) acc: string;
  @Prop({ type: String }) player: string;
  @Prop({ type: Number }) date: number;
  @Prop({ type: String }) id: string;
  @Prop({ type: Number, required: false }) countryRank?: number;
  @Prop({ type: Number, required: false }) farm?: number;
  @Prop({ type: Number, required: false }) range?: number;
  @Prop({ type: Number, required: false }) score?: number;
  @Prop({ type: Boolean, required: false }) migrated?: boolean;
}

export type UserStatDocument = UserStat & Document;
export type UserStatCollection = Model<UserStatDocument>;

export const UserStatSchema = SchemaFactory.createForClass(UserStat);
