import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import { Score, ScoreSchema } from "../score.schema";
import { ModCount, ModCountSchema } from "../stats";

@Schema({ collection: "users" })
export class User {
    @Prop({ type: Number, unique: true, index: "desc" }) id: number;
    @Prop({ type: String }) name: string;
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
    @Prop({ type: [ScoreSchema] }) legacyCurrentTop: Types.Array<Score>;
    @Prop({ type: [ModCountSchema] }) legacyModsCount: Types.Array<ModCount>;
    @Prop({ type: Number, required: false }) migrated?: number;
}

export type UserDocument = User & Document;
export type UserCollection = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
