import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model, ObjectId, Types } from 'mongoose';
import { batchModelMigrate, batchModelUpdate } from '../../../../util/batch';

const countryStatMigrationVersion = 1;

@Injectable()
export class CountryStatMigration {
  // todo replace all user with coutnry
  constructor(
    @InjectModel(v1.CountryStat.name, 'v1')
    private v1CountryStatModel: Model<v1.CountryStatDocument>,
    @InjectModel(v2.CountryStat.name, 'v2')
    private v2CountryStatModel: Model<v2.CountryStatDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1CountryStatModel,
      batchSize: 10000,
      migrationFunc: (item) => this.updateV2CountryStat(item),
      migrationVersion: countryStatMigrationVersion,
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
    console.log('listening v1 stat to v2');
  }

  private async updateV2CountryStat(stat: v1.CountryStatDocument) {
    if (!stat) return console.error('stat is null');

    try {
      const newStat: v2.CountryStat = {
        acc: Number(stat.acc) * 100,
        date: new Date(stat.date),
        pp: Number(stat.pp),
        farm: stat.farm,
        range: stat.range,
        playerWeighting: stat.playerWeighting,
        name: stat.name,
      };

      await this.v2CountryStatModel.create(newStat);
    } catch (e) {
      console.error(e);
    }
  }
}
