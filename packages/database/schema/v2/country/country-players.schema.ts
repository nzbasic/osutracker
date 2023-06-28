import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";

@Schema()
export class CountryPlayer {
    @Prop({ type: String }) name: string;
    @Prop({ type: Number }) pp: number;
}

const CountryPlayerSchema = SchemaFactory.createForClass(CountryPlayer);

@Schema({ collection: "countryplayers" })
export class CountryPlayers {
    @Prop({ type: Date }) date: Date;
    @Prop({ type: String }) name: string;
    @Prop({ type: [CountryPlayerSchema] })
    listPlayers: Types.Array<CountryPlayer>;
}

export type CountryPlayersDocument = CountryPlayers & Document;
export type CountryPlayersCollection = Model<CountryPlayersDocument>;

export const CountryPlayersSchema =
    SchemaFactory.createForClass(CountryPlayers);
