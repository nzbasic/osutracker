import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";

@Schema()
class HistoricTopPlayerPoint {
    @Prop({ type: String }) name: string;
    @Prop({ type: Number }) pp: number;
}

const HistoricTopPlayerPointSchema = SchemaFactory.createForClass(
    HistoricTopPlayerPoint
);

@Schema({ collection: "historictops" })
export class HistoricTop {
    @Prop({ type: Number }) year: number;
    @Prop({ type: String }) month: string;
    @Prop({ type: Number }) monthNumber: number;
    @Prop({ type: [HistoricTopPlayerPointSchema] })
    top: Types.Array<HistoricTopPlayerPoint>;
}

export type HistoricTopDocument = HistoricTop & Document;
export type HistoricTopCollection = Model<HistoricTopDocument>;

export const HistoricTopSchema = SchemaFactory.createForClass(HistoricTop);
