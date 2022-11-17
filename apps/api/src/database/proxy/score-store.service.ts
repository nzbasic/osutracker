import { proxy } from 'database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProxyScoreStoreService {
  constructor(
    @InjectModel(proxy.Score.name, 'proxy')
    private readonly scoreModel: proxy.ScoreCollection,
  ) {}

  getUserTopPlays(userId: number) {
    return this.scoreModel
      .find({
        user_id: userId,
        best_id: { $ne: null },
        weight: { $exists: true },
      })
      .sort({ pp: 'desc' })
      .exec();
  }
}
