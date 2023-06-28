import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";

@Schema()
export class Score {
    @Prop({ type: String }) name: string;
    @Prop({ type: String }) id: string;
    @Prop({ type: String }) setId: string;
    @Prop({ type: [String] }) mods: Types.Array<string>;
    @Prop({ type: String }) pp: string;
    @Prop({ type: String }) missCount: string;
    @Prop({ type: Number }) acc: number;
    @Prop({ type: String }) mapper: string;
    @Prop({ type: String }) length: string;
    @Prop({ type: Number }) objects: number;
    @Prop({ type: String, required: false }) time?: string;
    @Prop({ type: String, required: false }) player?: string;
    @Prop({ type: Boolean, required: false }) added?: boolean;
}

export type ScoreDocument = Score & Document;
export type ScoreCollection = Model<ScoreDocument>;

export const ScoreSchema = SchemaFactory.createForClass(Score);
