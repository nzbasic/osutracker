import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model } from 'mongoose';
import { convertV1Scores } from '../../../../util/convert';
import { batchModelMigrate } from '../../../../util/batch';

const userPlaysMigrationVersion = 1;

@Injectable()
export class UserPlaysMigration {
  constructor(
    @InjectModel(v1.UserPlays.name, 'v1')
    private v1UserPlaysModel: Model<v1.UserPlaysDocument>,
    @InjectModel(v2.UserPlays.name, 'v2')
    private v2UserPlaysModel: Model<v2.UserPlaysDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1UserPlaysModel,
      batchSize: 1000,
      migrationFunc: (item) => this.updateV2UserPlays(item),
      migrationVersion: userPlaysMigrationVersion,
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
    console.log('listening v1 plays to v2');
  }

  private async updateV2UserPlays(plays: v1.UserPlaysDocument) {
    if (!plays) return console.error('plays is null');

    try {
      const newPlays: v2.UserPlays = {
        date: new Date(plays.date),
        playerId: Number(plays.id),
        playerName: plays.name,
        added: convertV1Scores(plays.added),
        removed: convertV1Scores(plays.removed),
      };

      await this.v2UserPlaysModel.create(newPlays);
    } catch (e) {
      console.error(e);
    }
  }
}
