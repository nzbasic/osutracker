
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

const statisticsType = raw({
  level: {
    type: {
      current: { type: Number },
      progress: { type: Number },
    }
  },
  global_rank: { type: Number },
  pp: { type: Number },
  ranked_User: { type: Number },
  hit_accuracy: { type: Number },
  play_count: { type: Number },
  play_time: { type: Number },
  total_User: { type: Number },
  total_hits: { type: Number },
  maximum_combo: { type: Number },
  replays_watched_by_others: { type: Number },
  is_ranked: { type: Boolean },
  grade_counts: {
    type: {
      ss: { type: Number },
      ssh: { type: Number },
      s: { type: Number },
      sh: { type: Number },
      a: { type: Number },
    }
  },
  country_rank: { type: Number },
  rank: {
    type: {
      country: { type: Number },
    }
  }
})

@Schema()
export class User {
  @Prop({ type: String }) avatar_url: string;
  @Prop({ type: String }) country_code: string;
  @Prop({ type: String }) default_group: string;
  @Prop({ type: Number }) id: number;
  @Prop({ type: Boolean }) is_active: boolean;
  @Prop({ type: Boolean }) is_bot: boolean;
  @Prop({ type: Boolean }) is_deleted: boolean;
  @Prop({ type: Boolean }) is_online: boolean;
  @Prop({ type: Boolean }) is_supporter: boolean;
  @Prop({ type: String, nullable: true }) last_visit: string | null;
  @Prop({ type: Boolean }) pm_friends_only: boolean;
  @Prop({ type: String, nullable: true }) profile_colour: string | null;
  @Prop({ type: String }) username: string;
  @Prop({ type: String }) cover_url: string;
  @Prop({ type: String, nullable: true }) discord: string | null;
  @Prop({ type: Boolean }) has_supported: boolean;
  @Prop({ type: String, nullable: true }) interests: string | null;
  @Prop({ type: String }) join_date: string;
  @Prop(raw({ total: { type: Number }, available: { type: Number } })) kudosu: {
    total: number;
    available: number;
  };
  @Prop({ type: String, nullable: true }) location: string | null;
  @Prop({ type: Number }) max_blocks: number;
  @Prop({ type: Number }) max_friends: number;
  @Prop({ type: String, nullable: true }) occupation: string | null;
  @Prop({ type: String }) playmode: string;
  @Prop({ type: Array }) playstyle: Array<string>;
  @Prop({ type: Number }) post_count: number;
  @Prop({ type: Array }) profile_order: Array<string>;
  @Prop({ type: String, nullable: true }) title: string | null;
  @Prop({ type: String, nullable: true }) title_url: string | null;
  @Prop({ type: String, nullable: true }) twitter: string | null;
  @Prop({ type: String, nullable: true }) website: string | null;
  @Prop(raw({ code: { type: String }, name: { type: String } })) country: {
    code: string;
    name: string;
  };
  @Prop(raw({ custom_url: { type: String }, url: { type: String }, id: { type: Number }})) cover: {
    custom_url: string;
    url: string;
    id: number | null;
  };
  @Prop(raw([{ description: { type: String }, id: { type: Number }, length: { type: Number }, timestamp: { type: String }, type: { type: String }}])) account_history: Array<{
    description: string | null;
    id: number;
    length: number;
    timestamp: string;
    type: string;
  }>;
  @Prop(raw({ id: { type: Number }, tournament_id: { type: Number }, image: { type: String } })) active_tournament_banner: {
    id: number;
    tournament_id: number;
    image: string;
  };
  @Prop(raw([{ awarded_at: { type: String }, description: { type: String }, image_url: { type: String }, url: { type: String } }])) badges: Array<{
    awarded_at: string;
    description: string;
    image_url: string;
    url: string;
  }>
  @Prop({ type: Number }) beatmap_playcounts_count: number
  @Prop({ type: Number }) comments_count: number
  @Prop({ type: Number }) favourite_beatmapset_count: number
  @Prop({ type: Number }) follower_count: number
  @Prop({ type: Number }) graveyard_beatmapset_count: number
  @Prop(raw([{ playmodes: { type: Array }}])) groups: Array<{ playmodes: string[] | null; }>;
  @Prop({ type: Number }) guest_beatmapset_count: number
  @Prop({ type: Number }) loved_beatmapset_count: number
  @Prop({ type: Number }) mapping_follower_count: number
  @Prop(raw([{ start_date: { type: String }, count: { type: Number } }])) monthly_playcounts: Array<{
    start_date: string
    count: number
  }>
  @Prop(raw({ html: { type: String }, raw: { type: String } })) page: {
    html: string
    raw: string
  }
  @Prop({ type: Number }) pending_beatmapset_count: number
  @Prop({ type: Array }) previous_usernames: Array<string> | null;
  @Prop({ type: Number }) ranked_beatmapset_count: number
  @Prop(raw([{ start_date: { type: String }, count: { type: Number } }])) replays_watched_counts: Array<{
    start_date: string
    count: number
  }>
  @Prop({ type: Number }) Users_best_count: number
  @Prop({ type: Number }) Users_first_count: number
  @Prop({ type: Number }) Users_pinned_count: number
  @Prop({ type: Number }) Users_recent_count: number
  @Prop(statisticsType) statistics: {
    level: {
      current: number
      progress: number
    }
    global_rank: number
    pp: number
    ranked_User: number
    hit_accuracy: number
    play_count: number
    play_time: number
    total_User: number
    total_hits: number
    maximum_combo: number
    replays_watched_by_others: number
    is_ranked: boolean
    grade_counts: {
      ss: number
      ssh: number
      s: number
      sh: number
      a: number
    }
    country_rank: number
    rank: {
      country: number
    }
  }
  @Prop({ type: Number }) support_level: number
  @Prop(raw([{ achieved_at: { type: String }, achievement_id: { type: Number } }])) user_achievements: Array<{
    achieved_at: string
    achievement_id: number
  }>
  @Prop(raw({ mode: { type: String }, data: [{ type: Number }]})) rank_history: {
    mode: string
    data: Array<number>
  }
  @Prop({ type: Number }) ranked_and_approved_beatmapset_count: number
  @Prop({ type: Number }) unranked_beatmapset_count: number
}

export type UserDocument = User & Document;
export type UserCollection = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
