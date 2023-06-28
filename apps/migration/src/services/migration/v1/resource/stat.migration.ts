import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model } from 'mongoose';
import { convertV1Scores } from '../../../../util/convert';
import { batchModelMigrate } from '../../../../util/batch';

const overallStatsMigrationVersion = 1;

@Injectable()
export class StatMigration {
  constructor(
    @InjectModel(v1.OverallStats.name, 'v1')
    private v1OverallStatsModel: Model<v1.OverallStatsDocument>,
    @InjectModel(v2.OverallStats.name, 'v2')
    private v2OverallStatsModel: Model<v2.OverallStatsDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1OverallStatsModel,
      batchSize: 1,
      migrationFunc: (item) => this.updateV2OverallStats(item),
      migrationVersion: overallStatsMigrationVersion,
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

  private async updateV2OverallStats(stats: v1.OverallStatsDocument) {
    // if (!stats) return console.error('stats is null');
    // try {
    //   const newOverallStats: v2.OverallStats = {
    //     countryStats: {
    //       ...stats.countryStats,
    //       legacyModsCount
    //       acc: stats.counteyStats.acc * 100,
    //     },
    //     userStats: {
    //       ...stats.userStats,
    //       timeJoined: new Date(stats.userStats.timeJoined),
    //     },
    //     mapperCount: stats.mapperCount,
    //     setCount: stats.setCount.map((set) => ({
    //       ...set,
    //       setId: Number(set.setId),
    //     })),
    //   };
    //   await this.v2OverallStatsModel.create(newOverallStats);
    // } catch (e) {
    //   console.error(e);
    // }
  }
}
