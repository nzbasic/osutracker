import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
class PPBarrierCount {
  @Prop() setId: string;
  @Prop() count: number;
}

const PPBarrierCountSchema = SchemaFactory.createForClass(PPBarrierCount);

@Schema({ collection: 'ppbarriers' })
export class PPBarrier {
  @Prop() number: number;
  @Prop({ type: [PPBarrierCountSchema] }) list: Types.Array<PPBarrierCount>;
}

export type PPBarrierDocument = PPBarrier & Document;
export type PPBarrierCollection = Model<PPBarrierDocument>;

export const PPBarrierSchema = SchemaFactory.createForClass(PPBarrier);
