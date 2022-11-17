import { ProxyScoreStoreService } from 'src/database/proxy/score-store.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceV2 {
  constructor(private readonly scoreStoreService: ProxyScoreStoreService) {}

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
}
