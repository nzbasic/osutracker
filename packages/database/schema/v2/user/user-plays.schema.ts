import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import { Score, ScoreSchema } from "../score.schema";

@Schema({ collection: "userplays" })
export class UserPlays {
    @Prop({ type: String }) playerName: string;
    @Prop({ type: Number }) playerId: number;
    @Prop({ type: Date }) date: Date;
    @Prop({ type: [ScoreSchema] }) added: Types.Array<Score>;
    @Prop({ type: [ScoreSchema] }) removed: Types.Array<Score>;
}

export type UserPlaysDocument = UserPlays & Document;
export type UserPlaysCollection = Model<UserPlaysDocument>;

export const UserPlaysSchema = SchemaFactory.createForClass(UserPlays);
