import { ProxyScoreStoreService } from 'src/database/proxy/score-store.service';
import { Injectable } from '@nestjs/common';
import { UserStoreService } from 'src/database/v2/user-store.service';

@Injectable()
export class UserServiceV2 {
  constructor(
    private readonly scoreStoreService: ProxyScoreStoreService,
    private readonly userStoreService: UserStoreService,
  ) {}

  async getUserTopPlays(userId: number) {
    const plays = await this.scoreStoreService.getUserTopPlays(userId);

    const correctFormat = plays.filter((play) => play.best_id === play.id);
    const sorted = correctFormat.sort(
      (a, b) => b._id.getTimestamp() - a._id.getTimestamp(),
    );
    const output = [] as typeof plays;

    const idSet = new Set<number>();
    for (const score of sorted) {
      if (!idSet.has(score.beatmap.id)) {
        idSet.add(score.beatmap.id);
        output.push(score);
      }
    }

    return output.sort((a, b) => (b?.pp ?? 0) - (a?.pp ?? 0));
  }

  async getUserStats(userId: number) {
    const stats = await this.userStoreService.getUserStats(userId);
    return stats.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  async getUser(userId: number) {
    return this.userStoreService.getUser(userId);
  }
}
