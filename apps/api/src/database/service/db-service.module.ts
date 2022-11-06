import { CountryStoreService } from './country-store.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schema/user/user.schema';
import { UserStoreService } from './user-store.service';
import { CountrySchema } from '../schema/country/country.schema';
import { UtilityModule } from 'src/services/utility.module';
import { UserPlaysSchema } from '../schema/user/user-plays.schema';
import { UserStatSchema } from '../schema/user/user-stat.schema';
import { CountryStatSchema } from '../schema/country/country-stat.schema';
import { CountryPlaysSchema } from '../schema/country/country-plays.schema';
import { CountryPlayersSchema } from '../schema/country/country-players.schema';
import { OverallStatsSchema } from '../schema/stats/overall-stats.schema';
import { HistoricTopSchema } from '../schema/historic/historic-top.schema';
import { BeatmapSchema } from '../schema/beatmap.schema';
import { PPBarrierSchema } from '../schema/stats/pp-barrier.schema';
import { BeatmapCountSchema } from '../schema/beatmap-count.schema';
import { BeatmapSetSchema } from '../schema/beatmap-set.schema';

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
