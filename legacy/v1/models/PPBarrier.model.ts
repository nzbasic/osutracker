import { Schema, model } from 'mongoose';

export interface PPBarrierCount {
    setId: string,
    count: number,
}

export interface PPBarrier {
    number: Number,
    list: PPBarrierCount[]
}

const ppBarrierSchema = new Schema<PPBarrier>({
  number: Number,
  list: Array,
});

export const PPBarrierModel = model<PPBarrier>("ppBarrier", ppBarrierSchema);