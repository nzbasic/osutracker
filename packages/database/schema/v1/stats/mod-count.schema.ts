import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

@Schema()
export class ModCount {
  @Prop({ type: [String] }) mods: Types.Array<string>;
  @Prop({ type: Number }) count: number;
  @Prop({ type: Boolean, required: false }) migrated?: boolean;
}

export type ModCountDocument = ModCount & Document;
export type ModCountCollection = Model<ModCountDocument>;

export const ModCountSchema = SchemaFactory.createForClass(ModCount);
