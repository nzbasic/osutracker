import { Injectable } from '@nestjs/common';
import { v1 } from 'database';
import { v2 } from 'database';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserMigrationService {
  constructor(
    @InjectModel(v1.User.name, 'v1')
    private v1UserModel: Model<v1.UserDocument>,
    @InjectModel(v1.UserPlays.name, 'v1')
    private v1UserPlaysModel: Model<v1.UserPlaysDocument>,
    @InjectModel(v1.UserStat.name, 'v1')
    private v1UserStatsModel: Model<v1.UserStatDocument>,

    @InjectModel(v2.User.name, 'v2')
    private v2UserModel: Model<v2.UserDocument>,
    @InjectModel(v2.UserPlays.name, 'v2')
    private v2UserPlaysModel: Model<v2.UserPlaysDocument>,
    @InjectModel(v2.UserStat.name, 'v2')
    private v2UserStatsModel: Model<v2.UserStatDocument>,
  ) {}

  async migrateUsers() {
    console.log('Started user migration');

    const count = await this.v1UserModel.count({ migrated: null });

    const groupSize = 100;
    const groups = Math.ceil(count / groupSize);

    for (let i = 0; i < groups; i++) {
      const group = await this.v1UserModel
        .find({ migrated: null })
        .limit(groupSize)
        .skip(i * groupSize);
      for (const user of group) {
        const migratedCurrentTop: v2.Score[] = user.currentTop100.map(
          (score) => {
            return {
              beatmapId: Number(score.id),
              beatmapSetId: Number(score.setId),
              mods: score.mods,
              acc: score.acc * 100,
              pp: Number(score.pp),
              time: new Date(score.time),
              player: score.player,
              countMiss: Number(score.missCount),
            };
          },
        );

        try {
          await this.v2UserModel.create({
            id: Number(user.id),
            name: user.name,
            country: user.country,
            pp: user.pp,
            rank: Number(user.rank),
            acc: Number(user.acc),
            joined: new Date(user.joined),
            level: user.level,
            plays: Number(user.plays),
            range: Number(user.range),
            farm: user.farm,
            averageLength: user.averageLength,
            averageObjects: user.averageObjects,
            modsCount: user.modsCount,
            currentTop: migratedCurrentTop,
          });
        } catch {}

        await user.updateOne({ migrated: true });
      }

      console.log(`Migrated ${(i + 1) * groupSize}/${count} users`);
    }
  }
}
