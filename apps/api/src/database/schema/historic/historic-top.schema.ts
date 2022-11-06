import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
class HistoricTopPlayerPoint {
  @Prop() name: string;
  @Prop() pp: number;
}

const HistoricTopPlayerPointSchema = SchemaFactory.createForClass(
  HistoricTopPlayerPoint,
);

@Schema({ collection: 'historictops' })
export class HistoricTop {
  @Prop() year: number;
  @Prop() month: string;
  @Prop() monthNumber: number;
  @Prop({ type: [HistoricTopPlayerPointSchema] })
  top: Types.Array<HistoricTopPlayerPoint>;
}

export type HistoricTopDocument = HistoricTop & Document;
export type HistoricTopCollection = Model<HistoricTopDocument>;

export const HistoricTopSchema = SchemaFactory.createForClass(HistoricTop);
