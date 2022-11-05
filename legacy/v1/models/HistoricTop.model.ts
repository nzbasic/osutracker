import { Schema, model } from 'mongoose';

export interface HistoricTopPlayerPoint {
    name: string,
    pp: number
}

export interface HistoricTop {
    year: number,
    month: string,
    monthNumber: number,
    top: HistoricTopPlayerPoint[]
}

const historicTopSchema = new Schema<HistoricTop>({
    year: Number,
    month: String,
    monthNumber: Number,
    top: Array
});
  
export const HistoricTopModel = model("historictop", historicTopSchema);