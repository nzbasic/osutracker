import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { v2 } from 'database';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'User', schema: v2.UserSchema },
        { name: 'UserStat', schema: v2.UserStatSchema },
        { name: 'UserPlays', schema: v2.UserPlaysSchema },
        { name: 'Country', schema: v2.CountrySchema },
        { name: 'CountryStat', schema: v2.CountryStatSchema },
        { name: 'CountryPlays', schema: v2.CountryPlaysSchema },
        { name: 'CountryPlayers', schema: v2.CountryPlayersSchema },
        { name: 'OverallStats', schema: v2.OverallStatsSchema },
        { name: 'HistoricTop', schema: v2.HistoricTopSchema },
        { name: 'BeatmapSet', schema: v2.BeatmapSetSchema },
        { name: 'Beatmap', schema: v2.BeatmapSchema },
        { name: 'PPBarrier', schema: v2.PPBarrierSchema },
      ],
      'v2',
    ),
  ],
})
export class v2DBModule {}
