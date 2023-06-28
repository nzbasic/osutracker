import { v1, v2 } from 'database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SortOrder } from 'mongoose';

@Injectable()
export class UserStoreService {
  constructor(
    @InjectModel(v2.User.name, 'v2')
    private readonly userModel: v2.UserCollection,
    @InjectModel(v2.UserStat.name, 'v2')
    private readonly userStatsModel: v2.UserStatCollection,
    @InjectModel(v2.UserPlays.name, 'v2')
    private readonly userPlaysModel: v2.UserPlaysCollection,
  ) {}

  async getUserStats(playerId: number) {
    return await this.userStatsModel.find(
      { playerId },
      { _id: 0, __v: 0, playerId: 0, player: 0 },
    );
  }

  async getUser(userId: number) {
    console.log(userId);
    return await this.userModel.findOne({ id: userId }, { _id: 0, __v: 0 });
  }
}
