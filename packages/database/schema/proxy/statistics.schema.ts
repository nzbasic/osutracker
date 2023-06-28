import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

@Schema()
export class Statistics {
    @Prop({ type: Number, required: false }) user_id: number;
    @Prop({ type: Number, required: false }) mode: string;
    @Prop(raw({ current: { type: Number }, progress: { type: Number } }))
    level: {
        current: number;
        progress: number;
    };
    @Prop({ type: Number }) global_rank: number;
    @Prop({ type: Number }) pp: number;
    @Prop({ type: Number }) ranked_Statistics: number;
    @Prop({ type: Number }) hit_accuracy: number;
    @Prop({ type: Number }) play_count: number;
    @Prop({ type: Number }) play_time: number;
    @Prop({ type: Number }) total_Statistics: number;
    @Prop({ type: Number }) total_hits: number;
    @Prop({ type: Number }) maximum_combo: number;
    @Prop({ type: Number }) replays_watched_by_others: number;
    @Prop({ type: Boolean }) is_ranked: boolean;
    @Prop(
        raw({
            ss: { type: Number },
            ssh: { type: Number },
            s: { type: Number },
            sh: { type: Number },
            a: { type: Number },
        })
    )
    grade_counts: {
        ss: number;
        ssh: number;
        s: number;
        sh: number;
        a: number;
    };
    @Prop({ type: Number }) country_rank: number;
    @Prop(raw({ country: { type: Number } })) rank: {
        country: number;
    };
}

export type StatisticsDocument = Statistics & Document;
export type StatisticsCollection = Model<StatisticsDocument>;

export const StatisticsSchema = SchemaFactory.createForClass(Statistics);
