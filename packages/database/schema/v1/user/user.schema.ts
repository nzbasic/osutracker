import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, Model, Types } from "mongoose";
import { Score, ScoreSchema } from "../score.schema";
import { ModCount, ModCountSchema } from "../stats";

@Schema()
class PlayTime {
    @Prop({ type: String }) date: string;
    @Prop({ type: String }) pp: string;
}
const PlayTimeSchema = SchemaFactory.createForClass(PlayTime);

@Schema({ collection: "users" })
export class User {
    @Prop({ type: String }) name: string;
    @Prop({ type: String }) id: string;
    @Prop({ type: String }) url: string;
    @Prop({ type: String }) country: string;
    @Prop({ type: String }) pp: string;
    @Prop({ type: String }) rank: string;
    @Prop({ type: String }) acc: string;
    @Prop({ type: String }) plays: string;
    @Prop({ type: Number }) level: number;
    @Prop({ type: String }) range: string;
    @Prop({ type: Number }) joined: number;
    @Prop({ type: Number }) farm: number;
    @Prop({ type: Number }) averageLength: number;
    @Prop({ type: Number }) averageObjects: number;
    @Prop({ type: [ScoreSchema] }) currentTop: Types.Array<Score>;
    @Prop({ type: [ScoreSchema] }) currentTop100: Types.Array<Score>;
    @Prop({ type: [PlayTimeSchema] }) timesList: Types.Array<PlayTime>;
    @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
    @Prop({ type: Number, required: false }) migrated?: boolean;
    @Prop({ type: Number, required: false }) migrationVersion?: number;
    @Prop({ type: Date, required: false }) migrationDate?: Date;
}

export type UserDocument = User & Document;
export type UserCollection = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
