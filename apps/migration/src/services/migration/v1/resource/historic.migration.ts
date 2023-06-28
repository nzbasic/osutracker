import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model } from 'mongoose';
import { convertV1Scores } from '../../../../util/convert';
import { batchModelMigrate } from '../../../../util/batch';

const historicMigrationVersion = 1;

@Injectable()
export class HistoricMigration {
  constructor(
    @InjectModel(v1.HistoricTop.name, 'v1')
    private v1HistoricTopModel: Model<v1.HistoricTopDocument>,
    @InjectModel(v2.HistoricTop.name, 'v2')
    private v2HistoricTopModel: Model<v2.HistoricTopDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1HistoricTopModel,
      batchSize: 1,
      migrationFunc: (item) => this.updateV2HistoricTop(item),
      migrationVersion: historicMigrationVersion,
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

  private async updateV2HistoricTop(tops: v1.HistoricTopDocument) {
    if (!tops) return console.error('tops is null');

    try {
      const newTops: v2.HistoricTop = {
        year: tops.year,
        month: tops.month,
        monthNumber: tops.monthNumber,
        top: tops.top,
      };

      await this.v2HistoricTopModel.create(newTops);
    } catch (e) {
      console.error(e);
    }
  }
}
