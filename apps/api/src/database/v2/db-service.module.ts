import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user-store.service';
import { UtilityModule } from 'src/services/utility.module';
import { v2 } from 'database';

@Module({
  controllers: [],
  providers: [UserStoreService],
  exports: [UserStoreService],
  imports: [
    MongooseModule.forFeature(
      [
        { name: v2.User.name, schema: v2.UserSchema },
        { name: v2.UserStat.name, schema: v2.UserStatSchema },
        { name: v2.UserPlays.name, schema: v2.UserPlaysSchema },
        { name: v2.Country.name, schema: v2.CountrySchema },
        { name: v2.CountryStat.name, schema: v2.CountryStatSchema },
        { name: v2.CountryPlays.name, schema: v2.CountryPlaysSchema },
        { name: v2.CountryPlayers.name, schema: v2.CountryPlayersSchema },
        { name: v2.OverallStats.name, schema: v2.OverallStatsSchema },
        { name: v2.HistoricTop.name, schema: v2.HistoricTopSchema },
        { name: v2.BeatmapSet.name, schema: v2.BeatmapSetSchema },
        { name: v2.PPBarrier.name, schema: v2.PPBarrierSchema },
      ],
      'v2',
    ),
    UtilityModule,
  ],
})
export class V2DBServiceModule {}
