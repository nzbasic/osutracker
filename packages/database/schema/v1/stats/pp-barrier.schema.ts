import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
class PPBarrierCount {
  @Prop({ type: String }) setId: string;
  @Prop({ type: Number }) count: number;
}

const PPBarrierCountSchema = SchemaFactory.createForClass(PPBarrierCount);

@Schema({ collection: 'ppbarriers' })
export class PPBarrier {
  @Prop({ type: Number }) number: number;
  @Prop({ type: [PPBarrierCountSchema] }) list: Types.Array<PPBarrierCount>;
  @Prop({ type: Boolean, required: false }) migrated?: boolean;
}

export type PPBarrierDocument = PPBarrier & Document;
export type PPBarrierCollection = Model<PPBarrierDocument>;

export const PPBarrierSchema = SchemaFactory.createForClass(PPBarrier);
