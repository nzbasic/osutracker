// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Model } from 'mongoose';

// @Schema({ collection: 'beatmaps' })
// export class Beatmap {
//   @Prop({ index: 'desc', unique: true, type: Number }) id: number;
//   @Prop({ index: 'desc', type: Number }) setId: number;
//   @Prop({ type: Number, nullable: true }) count: number | null;
//   @Prop({ type: String }) status: string;
//   @Prop({ type: String }) mapper: string;
//   @Prop({ type: Number }) mapperId: number;
//   @Prop({ type: String }) title: string;
//   @Prop({ type: String }) artist: string;
//   @Prop({ type: String }) difficulty: string;
//   @Prop({ type: Number }) stars: number;
//   @Prop({ type: Number }) od: number;
//   @Prop({ type: Number }) ar: number;
//   @Prop({ type: Number }) cs: number;
//   @Prop({ type: Number }) hp: number;
//   @Prop({ type: Number, nullable: true }) bpm: number | null;
//   @Prop({ type: Number }) maxCombo: number;
//   @Prop({ type: Number }) countCircles: number;
//   @Prop({ type: Number }) countSliders: number;
//   @Prop({ type: Number }) countSpinners: number;
//   @Prop({ type: Number }) hitLength: number;
//   @Prop({ type: Number }) totalLength: number;
//   @Prop({ type: Number }) passcount: number;
//   @Prop({ type: Number }) playcount: number;
//   @Prop({ type: String, nullable: true }) checksum: string | null;
//   @Prop({ type: Date }) ranked: Date;
// }

// export type BeatmapDocument = Beatmap & Document;
// export type BeatmapCollection = Model<BeatmapDocument>;
// export const BeatmapSchema = SchemaFactory.createForClass(Beatmap);

import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

const beatmapsetType = raw({
    artist: { type: String },
    artist_unicode: { type: String },
    covers: {
        type: {
            cover: { type: String },
            "cover@2x": { type: String },
            card: { type: String },
            "card@2x": { type: String },
            list: { type: String },
            "list@2x": { type: String },
            slimcover: { type: String },
            "slimcover@2x": { type: String },
        },
    },
    creator: { type: String },
    favourite_count: { type: Number },
    hype: {
        type: {
            current: { type: Number },
            required: { type: Number },
        },
    },
    id: { type: Number },
    nsfw: { type: Boolean },
    offset: { type: Number },
    play_count: { type: Number },
    preview_url: { type: String },
    source: { type: String },
    spotlight: { type: Boolean },
    status: { type: String },
    title: { type: String },
    title_unicode: { type: String },
    track_id: { type: Number },
    user_id: { type: Number },
    video: { type: Boolean },
    availability: {
        type: {
            download_disabled: { type: Boolean },
            more_information: { type: String },
        },
    },
    bpm: { type: Number },
    can_be_hyped: { type: Boolean },
    discussion_enabled: { type: Boolean },
    discussion_locked: { type: Boolean },
    is_scoreable: { type: Boolean },
    last_updated: { type: String },
    legacy_thread_url: { type: String },
    nominations_summary: {
        type: {
            current: { type: Number },
            required: { type: Number },
        },
    },
    ranked: { type: Number },
    ranked_date: { type: String },
    storyboard: { type: Boolean },
    submitted_date: { type: String },
    tags: { type: String },
    ratings: [{ type: Number }],
});

@Schema()
export class Beatmap {
    @Prop({ type: Number }) beatmapset_id: number;
    @Prop({ type: Number }) difficulty_rating: number;
    @Prop({ type: Number }) id: number;
    @Prop({ type: String }) mode: string;
    @Prop({ type: String }) status: string;
    @Prop({ type: Number }) total_length: number;
    @Prop({ type: Number }) user_id: number;
    @Prop({ type: String }) version: string;
    @Prop({ type: Number }) accuracy: number;
    @Prop({ type: Number }) ar: number;
    @Prop({ type: Number, nullable: true }) bpm: number | null;
    @Prop({ type: Boolean }) convert: boolean;
    @Prop({ type: Number }) count_circles: number;
    @Prop({ type: Number }) count_sliders: number;
    @Prop({ type: Number }) count_spinners: number;
    @Prop({ type: Number }) cs: number;
    @Prop({ type: String, nullable: true }) deleted_at: string | null;
    @Prop({ type: Number }) drain: number;
    @Prop({ type: Number }) hit_length: number;
    @Prop({ type: Boolean }) is_scoreable: boolean;
    @Prop({ type: String }) last_updated: string;
    @Prop({ type: Number }) mode_int: number;
    @Prop({ type: Number }) passcount: number;
    @Prop({ type: Number }) playcount: number;
    @Prop({ type: Number }) ranked: number;
    @Prop({ type: String }) url: string;
    @Prop({ type: String, nullable: true }) checksum: string | null;
    @Prop(beatmapsetType) beatmapset: {
        artist: string;
        artist_unicode: string;
        covers: {
            cover: string;
            "cover@2x": string;
            card: string;
            "card@2x": string;
            list: string;
            "list@2x": string;
            slimcover: string;
            "slimcover@2x": string;
        };
        creator: string;
        favourite_count: number;
        hype: {
            current: number;
            required: number;
        } | null;
        id: number;
        nsfw: boolean;
        offset: number;
        play_count: number;
        preview_url: string;
        source: string;
        spotlight: boolean;
        status: string;
        title: string;
        title_unicode: string;
        track_id: number | null;
        user_id: number;
        video: boolean;
        availability: {
            download_disabled: boolean;
            more_information: string | null;
        };
        bpm: number;
        can_be_hyped: boolean;
        discussion_enabled: boolean;
        discussion_locked: boolean;
        is_scoreable: boolean;
        last_updated: string;
        legacy_thread_url: string;
        nominations_summary: {
            current: number;
            required: number;
        };
        ranked: number;
        ranked_date: string;
        storyboard: boolean;
        submitted_date: string;
        tags: string;
        ratings: Array<number>;
    };
    @Prop(raw({ fail: [{ type: Number }], exit: [{ type: Number }] }))
    failtimes: {
        fail: Array<number>;
        exit: Array<number>;
    };
    @Prop({ type: Number }) max_combo: number;
}

export type BeatmapDocument = Beatmap & Document;
export type BeatmapCollection = Model<BeatmapDocument>;

export const BeatmapSchema = SchemaFactory.createForClass(Beatmap);
