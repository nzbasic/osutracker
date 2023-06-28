import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

const statisticsType = raw({
    count_100: { type: Number },
    count_300: { type: Number },
    count_50: { type: Number },
    count_geki: { type: Number },
    count_katu: { type: Number },
    count_miss: { type: Number },
});

const currentUserAttributesType = raw({
    pin: {
        type: {
            is_pinned: { type: Boolean },
            score_id: { type: Number },
            score_type: { type: String },
        },
    },
});

const beatmapType = raw({
    beatmapset_id: { type: Number },
    difficulty_rating: { type: Number },
    id: { type: Number },
    mode: { type: String },
    status: { type: String },
    total_length: { type: Number },
    user_id: { type: Number },
    version: { type: String },
    accuracy: { type: Number },
    ar: { type: Number },
    bpm: { type: Number },
    convert: { type: String },
    count_circles: { type: Number },
    count_sliders: { type: Number },
    count_spinners: { type: Number },
    cs: { type: Number },
    deleted_at: { type: String },
    drain: { type: Number },
    hit_length: { type: Number },
    is_scoreable: { type: String },
    last_updated: { type: String },
    mode_int: { type: Number },
    passcount: { type: Number },
    playcount: { type: Number },
    ranked: { type: Number },
    url: { type: String },
    checksum: { type: String },
});

const beatmapSetType = raw({
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
});

const userType = raw({
    avatar_url: { type: String },
    country_code: { type: String },
    default_group: { type: String },
    id: { type: Number },
    is_active: { type: Boolean },
    is_bot: { type: Boolean },
    is_deleted: { type: Boolean },
    is_online: { type: Boolean },
    is_supporter: { type: Boolean },
    last_visit: { type: String },
    pm_friends_only: { type: Boolean },
    profile_colour: { type: String },
    username: { type: String },
});

@Schema()
export class Score {
    @Prop({ type: Number }) accuracy: number;
    @Prop({ type: Number, nullable: true }) best_id: number | null;
    @Prop({ type: Number }) user_id: number;
    @Prop({ type: String }) created_at: string;
    @Prop({ type: Number }) id: number;
    @Prop({ type: Number }) max_combo: number;
    @Prop({ type: String }) mode: string;
    @Prop({ type: Number }) mode_int: number;
    @Prop([{ type: String }]) mods: Array<string>;
    @Prop({ type: Boolean }) passed: boolean;
    @Prop({ type: Boolean }) perfect: boolean;
    @Prop({ type: Number, nullable: true }) pp: number | null;
    @Prop({ type: String }) rank: string;
    @Prop({ type: Boolean }) replay: boolean;
    @Prop({ type: Number }) score: number;
    @Prop(statisticsType) statistics: {
        count_100: number;
        count_300: number;
        count_50: number;
        count_geki: number;
        count_katu: number;
        count_miss: number;
    };
    @Prop(currentUserAttributesType) current_user_attributes: {
        pin: {
            is_pinned: boolean;
            score_id: number;
            score_type: string;
        } | null;
    };
    @Prop(beatmapType) beatmap: {
        beatmapset_id: number;
        difficulty_rating: number;
        id: number;
        mode: string;
        status: string;
        total_length: number;
        user_id: number;
        version: string;
        accuracy: number;
        ar: number;
        bpm: number | null;
        convert: boolean;
        count_circles: number;
        count_sliders: number;
        count_spinners: number;
        cs: number;
        deleted_at: string | null;
        drain: number;
        hit_length: number;
        is_scoreable: boolean;
        last_updated: string;
        mode_int: number;
        passcount: number;
        playcount: number;
        ranked: number;
        url: string;
        checksum: string | null;
    };
    @Prop(beatmapSetType) beatmapset: {
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
    };
    @Prop(userType) user: {
        avatar_url: string;
        country_code: string;
        default_group: string;
        id: number;
        is_active: boolean;
        is_bot: boolean;
        is_deleted: boolean;
        is_online: boolean;
        is_supporter: boolean;
        last_visit: string | null;
        pm_friends_only: boolean;
        profile_colour: string | null;
        username: string;
    };
    @Prop(raw({ percentage: { type: Number }, pp: { type: Number } })) weight: {
        percentage: number;
        pp: number;
    } | null;
}

export type ScoreDocument = Score & Document;
export type ScoreCollection = Model<ScoreDocument>;

export const ScoreSchema = SchemaFactory.createForClass(Score);
