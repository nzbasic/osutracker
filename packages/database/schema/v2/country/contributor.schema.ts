import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

@Schema()
export class Contributor {
    @Prop({ type: String }) name: string;
    @Prop({ type: Number }) pp: number;
}

export type ContributorDocument = Contributor & Document;
export type ContributorCollection = Model<ContributorDocument>;

export const ContributorSchema = SchemaFactory.createForClass(Contributor);
