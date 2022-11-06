import { PPBarrierCollection } from './../schema/stats/pp-barrier.schema';
import { HistoricTopCollection } from './../schema/historic/historic-top.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OverallStatsCollection } from '../schema/stats/overall-stats.schema';
import { BeatmapSetCollection } from '../schema/beatmap-set.schema';
import { BeatmapCollection } from '../schema/beatmap.schema';
import { BeatmapCountCollection } from '../schema/beatmap-count.schema';

@Injectable()
export class StatStoreService {
  constructor(
    @InjectModel('OverallStats')
    private readonly overallStatsModel: OverallStatsCollection,
    @InjectModel('HistoricTop')
    private readonly historicTopModel: HistoricTopCollection,
    @InjectModel('BeatmapSet')
    private readonly beatmapSetModel: BeatmapSetCollection,
    @InjectModel('Beatmap')
    private readonly beatmapModel: BeatmapCollection,
    @InjectModel('PPBarrier')
    private readonly ppBarrierModel: PPBarrierCollection,
    @InjectModel('BeatmapCount')
    private readonly beatmapCountModel: BeatmapCountCollection,
  ) {}

  getOverallStats() {
    return this.overallStatsModel.findOne().exec();
  }

  getHistoricTopPlays() {
    return this.historicTopModel.find().exec();
  }

  getSetCounts(limit?: number) {
    const query = this.beatmapSetModel.find().sort({ count: -1 });
    if (limit) query.limit(limit);
    return query.exec();
  }

  getPPBarrierNumbers() {
    this.ppBarrierModel.find({}, { number: 1 }).exec();
  }

  getPPBarrier(number: number) {
    return this.ppBarrierModel.findOne({ number }).exec();
  }

  getAllPPBarriers() {
    return this.ppBarrierModel.find().exec();
  }

  getBeatmapById(id: string) {
    return this.beatmapModel.findOne({ id }).exec();
  }

  getAllBeatmapCounts(offset?: number, limit?: number) {
    const query = this.beatmapCountModel
      .find({}, { _id: 0, id: 1, count: 1 })
      .sort({ count: -1 });

    if (offset) query.skip(offset);
    if (limit) query.limit(limit);

    return query.exec();
  }

  getBeatmapCountById(id: number) {
    return this.beatmapCountModel.findOne({ id }).exec();
  }

  getBeatmapsByIds(ids: string[]) {
    return this.beatmapModel.find({ id: { $in: ids } }).exec();
  }
}
