import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model, ObjectId, Types } from 'mongoose';
import { batchModelMigrate, batchModelUpdate } from '../../../../util/batch';

const userStatMigrationVersion = 1;

@Injectable()
export class UserStatMigration {
  constructor(
    @InjectModel(v1.UserStat.name, 'v1')
    private v1UserStatModel: Model<v1.UserStatDocument>,
    @InjectModel(v2.UserStat.name, 'v2')
    private v2UserStatModel: Model<v2.UserStatDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1UserStatModel,
      batchSize: 10000,
      migrationFunc: (item) => this.updateV2UserStat(item),
      migrationVersion: userStatMigrationVersion,
    });
  }

  public listen() {
    // this.v1UserModel
    //   .watch([], { fullDocument: 'updateLookup' })
    //   .on('change', (u) => {
    //     if (u.operationType === 'update' || u.operationType === 'insert') {
    //       this.updateV2User(u.fullDocument);
    //     }
    //   });
    console.log('listening v1 stat to v2');
  }

  private async updateV2UserStat(stat: v1.UserStatDocument) {
    if (!stat) return console.error('stat is null');

    try {
      const newStat: v2.UserStat = {
        acc: Number(stat.acc),
        countryRank: stat.countryRank,
        date: new Date(stat.date),
        player: stat.player,
        playerId: Number(stat.id),
        pp: Number(stat.pp),
        rank: Number(stat.rank),
        score: stat.score,
        plays: Number(stat.plays),
        farm: stat.farm,
        range: stat.range,
      };

      await this.v2UserStatModel.create(newStat);
    } catch (e) {
      console.error(e);
    }
  }
}
