import { CountryStoreService } from './country-store.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStoreService } from './user-store.service';
import { UtilityModule } from 'src/services/utility.module';
import {
  CountrySchema,
  UserPlaysSchema,
  UserStatSchema,
  CountryStatSchema,
  CountryPlaysSchema,
  CountryPlayersSchema,
  OverallStatsSchema,
  HistoricTopSchema,
  BeatmapSchema,
  PPBarrierSchema,
  BeatmapCountSchema,
  BeatmapSetSchema,
  UserSchema,
} from 'database';

@Module({
  controllers: [],
  providers: [UserStoreService, CountryStoreService],
  exports: [UserStoreService, CountryStoreService],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserStat', schema: UserStatSchema },
      { name: 'UserPlays', schema: UserPlaysSchema },
      { name: 'Country', schema: CountrySchema },
      { name: 'CountryStat', schema: CountryStatSchema },
      { name: 'CountryPlays', schema: CountryPlaysSchema },
      { name: 'CountryPlayers', schema: CountryPlayersSchema },
      { name: 'OverallStats', schema: OverallStatsSchema },
      { name: 'HistoricTop', schema: HistoricTopSchema },
      { name: 'BeatmapSet', schema: BeatmapSetSchema },
      { name: 'Beatmap', schema: BeatmapSchema },
      { name: 'PPBarrier', schema: PPBarrierSchema },
      { name: 'BeatmapCount', schema: BeatmapCountSchema },
    ]),
    UtilityModule,
  ],
})
export class DbServiceModule {}
