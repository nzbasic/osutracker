import { ModCount, ModCountSchema } from "./../stats/mod-count.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import { Contributor, ContributorSchema } from "./contributor.schema";
import { Score, ScoreSchema } from "../score.schema";

@Schema({ collection: "countries" })
export class Country {
    @Prop({ type: String }) name: string;
    @Prop({ type: String }) abbreviation: string;
    @Prop({ type: Number }) acc: number;
    @Prop({ type: String }) pp: string;
    @Prop({ type: Number }) farm: number;
    @Prop({ type: String }) range: string;
    @Prop({ type: Number }) playerWeighting: number;
    @Prop({ type: Number }) averageObjects: number;
    @Prop({ type: Number }) averageLength: number;
    @Prop({ type: [ModCountSchema] }) modsCount: Types.Array<ModCount>;
    @Prop({ type: Number, required: false }) rank?: number;
    @Prop({ type: [ScoreSchema] }) scoresCurrent: Types.Array<Score>;
    @Prop({ type: [ContributorSchema] }) contributors: Types.Array<Contributor>;
    @Prop({ type: Boolean, required: false }) migrated?: boolean;
    @Prop({ type: Number, required: false }) migrationVersion?: number;
    @Prop({ type: Date, required: false }) migrationDate?: Date;
}

export type CountryDocument = Country & Document;
export type CountryCollection = Model<CountryDocument>;

export const CountrySchema = SchemaFactory.createForClass(Country);
