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
    MongooseModule.forFeature([
      { name: 'User', schema: v1.UserSchema },
      { name: 'UserStat', schema: v1.UserStatSchema },
      { name: 'UserPlays', schema: v1.UserPlaysSchema },
      { name: 'Country', schema: v1.CountrySchema },
      { name: 'CountryStat', schema: v1.CountryStatSchema },
      { name: 'CountryPlays', schema: v1.CountryPlaysSchema },
      { name: 'CountryPlayers', schema: v1.CountryPlayersSchema },
      { name: 'OverallStats', schema: v1.OverallStatsSchema },
      { name: 'HistoricTop', schema: v1.HistoricTopSchema },
      { name: 'BeatmapSet', schema: v1.BeatmapSetSchema },
      { name: 'Beatmap', schema: v1.BeatmapSchema },
      { name: 'PPBarrier', schema: v1.PPBarrierSchema },
      { name: 'BeatmapCount', schema: v1.BeatmapCountSchema },
    ]),
    UtilityModule,
  ],
})
export class DbServiceModule {}
