import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
class CountryPlayer {
  @Prop() name: string;
  @Prop() pp: string;
}

const CountryPlayerSchema = SchemaFactory.createForClass(CountryPlayer);

@Schema({ collection: 'countryplayers' })
export class CountryPlayers {
  @Prop() date: number;
  @Prop({ type: [CountryPlayerSchema] })
  listPlayers: Types.Array<CountryPlayer>;
}

export type CountryPlayersDocument = CountryPlayers & Document;
export type CountryPlayersCollection = Model<CountryPlayersDocument>;

export const CountryPlayersSchema =
  SchemaFactory.createForClass(CountryPlayers);
