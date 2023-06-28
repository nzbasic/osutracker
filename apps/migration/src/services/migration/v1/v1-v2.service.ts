import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1 } from 'database';
import { Model } from 'mongoose';
import { MigrationService } from '../types';
import { CountryPlayersMigration } from './resource/country-players.migration';
import { CountryPlaysMigration } from './resource/country-plays.migration';
import { CountryStatMigration } from './resource/country-stat.migration';
import { CountryMigration } from './resource/country.migration';
import { HistoricMigration } from './resource/historic.migration';
import { StatMigration } from './resource/stat.migration';
import { UserPlaysMigration } from './resource/user-plays.migration';
import { UserStatMigration } from './resource/user-stat.migration';
import { UserMigration } from './resource/user.migration';

@Injectable()
export class V1ToV2MigrationService implements MigrationService {
  private readonly migrations: MigrationService[];

  constructor(
    private readonly userMigration: UserMigration,
    private readonly userStatMigration: UserStatMigration,
    private readonly userPlaysMigration: UserPlaysMigration,
    private readonly countryMigration: CountryMigration,
    private readonly countryStatMigration: CountryStatMigration,
    private readonly countryPlaysMigration: CountryPlaysMigration,
    private readonly countryPlayersMigration: CountryPlayersMigration,
    private readonly historicTopMigration: HistoricMigration,
    private readonly statMigration: StatMigration,
  ) {
    this.migrations = [
      this.userMigration,
      this.userStatMigration,
      this.userPlaysMigration,
      this.countryMigration,
      this.countryStatMigration,
      this.countryPlaysMigration,
      this.countryPlayersMigration,
      this.historicTopMigration,
      // this.statMigration,
    ];
  }

  public async migrate() {
    console.log('migrating v1 to v2');
    for (const migration of this.migrations) {
      await migration.migrate();
    }
  }

  public listen() {
    console.log('listening v1 to v2');
    // this.userMigration.listen();
  }
}
