import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
class CountryPlayer {
  @Prop({ type: String }) name: string;
  @Prop({ type: String }) pp: string;
}

const CountryPlayerSchema = SchemaFactory.createForClass(CountryPlayer);

@Schema({ collection: 'countryplayers' })
export class CountryPlayers {
  @Prop({ type: Number }) date: number;
  @Prop({ type: [CountryPlayerSchema] })
  listPlayers: Types.Array<CountryPlayer>;
}

export type CountryPlayersDocument = CountryPlayers & Document;
export type CountryPlayersCollection = Model<CountryPlayersDocument>;

export const CountryPlayersSchema =
  SchemaFactory.createForClass(CountryPlayers);
