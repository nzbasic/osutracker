import { CountryStoreService } from './country-store.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user-store.service';
import { UtilityModule } from 'src/services/utility.module';
import { v1 } from 'database';

@Module({
  controllers: [],
  providers: [UserStoreService, CountryStoreService],
  exports: [UserStoreService, CountryStoreService],
  imports: [
    MongooseModule.forFeature(
      [
        { name: v1.User.name, schema: v1.UserSchema },
        { name: v1.UserStat.name, schema: v1.UserStatSchema },
        { name: v1.UserPlays.name, schema: v1.UserPlaysSchema },
        { name: v1.Country.name, schema: v1.CountrySchema },
        { name: v1.CountryStat.name, schema: v1.CountryStatSchema },
        { name: v1.CountryPlays.name, schema: v1.CountryPlaysSchema },
        { name: v1.CountryPlayers.name, schema: v1.CountryPlayersSchema },
        { name: v1.OverallStats.name, schema: v1.OverallStatsSchema },
        { name: v1.HistoricTop.name, schema: v1.HistoricTopSchema },
        { name: v1.BeatmapSet.name, schema: v1.BeatmapSetSchema },
        { name: v1.Beatmap.name, schema: v1.BeatmapSchema },
        { name: v1.PPBarrier.name, schema: v1.PPBarrierSchema },
        { name: v1.BeatmapCount.name, schema: v1.BeatmapCountSchema },
      ],
      'v1',
    ),
    UtilityModule,
  ],
})
export class V1DBServiceModule {}
