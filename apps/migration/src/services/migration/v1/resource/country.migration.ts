import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model } from 'mongoose';
import { convertV1Scores } from '../../../../util/convert';
import { batchModelMigrate } from '../../../../util/batch';

const countryMigrationVersion = 2;

@Injectable()
export class CountryMigration {
  constructor(
    @InjectModel(v1.Country.name, 'v1')
    private v1CountryModel: Model<v1.CountryDocument>,
    @InjectModel(v2.Country.name, 'v2')
    private v2CountryModel: Model<v2.CountryDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1CountryModel,
      batchSize: 200,
      migrationFunc: (item) => this.updateV2Country(item),
      migrationVersion: countryMigrationVersion,
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
    console.log('listening v1 to v2');
  }

  private async updateV2Country(country: v1.CountryDocument) {
    if (!country) return console.error('Country is null');

    try {
      const newCountry: v2.Country = {
        name: country.name,
        abbreviation: country.abbreviation,
        pp: Number(country.pp),
        acc: Number(country.acc),
        range: Number(country.range),
        farm: country.farm,
        averageLength: country.averageLength,
        averageObjects: country.averageObjects,
        legacyModsCount: country.modsCount,
        legacyCurrentTop: convertV1Scores(country.scoresCurrent),
        playerWeighting: country.playerWeighting,
        contributors: country.contributors,
      };

      await this.v2CountryModel.updateOne(
        { name: newCountry.name },
        newCountry,
        {
          upsert: true,
        },
      );
    } catch (e) {
      console.error(e);
    }
  }
}
