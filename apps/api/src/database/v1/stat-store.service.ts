import { v1 } from 'database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StatStoreService {
  constructor(
    @InjectModel(v1.OverallStats.name, 'v1')
    private readonly overallStatsModel: v1.OverallStatsCollection,
    @InjectModel(v1.HistoricTop.name, 'v1')
    private readonly historicTopModel: v1.HistoricTopCollection,
    @InjectModel(v1.BeatmapSet.name, 'v1')
    private readonly beatmapSetModel: v1.BeatmapSetCollection,
    @InjectModel(v1.Beatmap.name, 'v1')
    private readonly beatmapModel: v1.BeatmapCollection,
    @InjectModel(v1.PPBarrier.name, 'v1')
    private readonly ppBarrierModel: v1.PPBarrierCollection,
    @InjectModel(v1.BeatmapCount.name, 'v1')
    private readonly beatmapCountModel: v1.BeatmapCountCollection,
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
