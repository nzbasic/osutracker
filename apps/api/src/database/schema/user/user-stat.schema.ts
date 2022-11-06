import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'userstats' })
export class UserStat {
  @Prop() rank: string;
  @Prop() pp: string;
  @Prop() plays: string;
  @Prop() acc: string;
  @Prop() player: string;
  @Prop() date: number;
  @Prop() id: string;
  @Prop() countryRank?: number;
  @Prop() farm?: number;
  @Prop() range?: number;
  @Prop() score?: number;
}

export type UserStatDocument = UserStat & Document;
export type UserStatCollection = Model<UserStatDocument>;

export const UserStatSchema = SchemaFactory.createForClass(UserStat);
