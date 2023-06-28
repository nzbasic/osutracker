import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { CountryPlayersMigration } from './resource/country-players.migration';
import { CountryPlaysMigration } from './resource/country-plays.migration';
import { CountryStatMigration } from './resource/country-stat.migration';
import { CountryMigration } from './resource/country.migration';
import { HistoricMigration } from './resource/historic.migration';
import { StatMigration } from './resource/stat.migration';
import { UserPlaysMigration } from './resource/user-plays.migration';
import { UserStatMigration } from './resource/user-stat.migration';
import { UserMigration } from './resource/user.migration';
import { V1ToV2MigrationService } from './v1-v2.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: v1.User.name, schema: v1.UserSchema },
        { name: v1.UserPlays.name, schema: v1.UserPlaysSchema },
        { name: v1.UserStat.name, schema: v1.UserStatSchema },
        { name: v1.Country.name, schema: v1.CountrySchema },
        { name: v1.CountryPlays.name, schema: v1.CountryPlaysSchema },
        { name: v1.CountryStat.name, schema: v1.CountryStatSchema },
        { name: v1.CountryPlayers.name, schema: v1.CountryPlayersSchema },
        { name: v1.HistoricTop.name, schema: v1.HistoricTopSchema },
        { name: v1.OverallStats.name, schema: v1.OverallStatsSchema },
      ],
      'v1',
    ),
    MongooseModule.forFeature(
      [
        { name: v2.User.name, schema: v2.UserSchema },
        { name: v2.UserPlays.name, schema: v2.UserPlaysSchema },
        { name: v2.UserStat.name, schema: v2.UserStatSchema },
        { name: v2.Country.name, schema: v2.CountrySchema },
        { name: v2.CountryPlays.name, schema: v2.CountryPlaysSchema },
        { name: v2.CountryStat.name, schema: v2.CountryStatSchema },
        { name: v2.CountryPlayers.name, schema: v2.CountryPlayersSchema },
        { name: v2.HistoricTop.name, schema: v2.HistoricTopSchema },
        { name: v2.OverallStats.name, schema: v2.OverallStatsSchema },
      ],
      'v2',
    ),
  ],
  providers: [
    V1ToV2MigrationService,
    UserMigration,
    UserStatMigration,
    UserPlaysMigration,
    CountryMigration,
    CountryStatMigration,
    CountryPlaysMigration,
    CountryPlayersMigration,
    HistoricMigration,
    StatMigration,
  ],
  exports: [V1ToV2MigrationService],
})
export class V1MigrationModule {}
