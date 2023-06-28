import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model } from 'mongoose';
import { convertV1Scores } from '../../../../util/convert';
import { batchModelMigrate } from '../../../../util/batch';

const userMigrationVersion = 1;

const query = { migrationVersion: null };

@Injectable()
export class UserMigration {
  constructor(
    @InjectModel(v1.User.name, 'v1')
    private v1UserModel: Model<v1.UserDocument>,
    @InjectModel(v2.User.name, 'v2')
    private v2UserModel: Model<v2.UserDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1UserModel,
      batchSize: 200,
      migrationFunc: (item) => this.updateV2User(item),
      migrationVersion: userMigrationVersion,
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
    console.log('listening v1 to v2');
  }

  private async updateV2User(user: v1.UserDocument) {
    if (!user) return console.error('user is null');

    try {
      const newUser: v2.User = {
        id: Number(user.id),
        name: user.name,
        country: user.country,
        pp: Number(user.pp),
        rank: Number(user.rank),
        acc: Number(user.acc),
        joined: new Date(user.joined),
        level: user.level,
        plays: Number(user.plays),
        range: Number(user.range),
        farm: user.farm,
        averageLength: user.averageLength,
        averageObjects: user.averageObjects,
        legacyModsCount: user.modsCount,
        legacyCurrentTop: convertV1Scores(user.currentTop100),
        migrated: userMigrationVersion,
      };

      await this.v2UserModel.updateOne({ id: newUser.id }, newUser, {
        upsert: true,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
