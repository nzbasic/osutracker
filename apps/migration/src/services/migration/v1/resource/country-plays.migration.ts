import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model } from 'mongoose';
import { convertV1Scores } from '../../../../util/convert';
import { batchModelMigrate } from '../../../../util/batch';

const countryPlaysMigrationVersion = 1;

@Injectable()
export class CountryPlaysMigration {
  constructor(
    @InjectModel(v1.CountryPlays.name, 'v1')
    private v1CountryPlaysModel: Model<v1.CountryPlaysDocument>,
    @InjectModel(v2.CountryPlays.name, 'v2')
    private v2CountryPlaysModel: Model<v2.CountryPlaysDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1CountryPlaysModel,
      batchSize: 1000,
      migrationFunc: (item) => this.updateV2CountryPlays(item),
      migrationVersion: countryPlaysMigrationVersion,
    });
  }

  public listen() {
    // this.v1CountryModel
    //   .watch([], { fullDocument: 'updateLookup' })
    //   .on('change', (u) => {
    //     if (u.operationType === 'update' || u.operationType === 'insert') {
    //       this.updateV2Country(u.fullDocument);
    //     }
    //   });
    console.log('listening v1 plays to v2');
  }

  private async updateV2CountryPlays(plays: v1.CountryPlaysDocument) {
    if (!plays) return console.error('plays is null');

    try {
      const newPlays: v2.CountryPlays = {
        date: new Date(plays.date),
        name: plays.name,
        added: convertV1Scores(plays.added),
        removed: convertV1Scores(plays.removed),
      };

      await this.v2CountryPlaysModel.create(newPlays);
    } catch (e) {
      console.error(e);
    }
  }
}
