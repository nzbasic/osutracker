import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema({ collection: 'beatmaps' })
export class Beatmap {
  @Prop() id: string;
  @Prop() setId: string;
  @Prop() name: string;
  @Prop() maxCombo: string;
  @Prop() objects: number;
  @Prop() starRating: string;
  @Prop() length: string;
  @Prop() mapper: string;
  @Prop() count: number;
}

export type BeatmapDocument = Beatmap & Document;
export type BeatmapCollection = Model<BeatmapDocument>;

export const BeatmapSchema = SchemaFactory.createForClass(Beatmap);
