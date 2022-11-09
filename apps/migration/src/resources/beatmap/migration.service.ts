import { Injectable } from '@nestjs/common';
import { v1 } from 'database';
import { v2 } from 'database';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BeatmapMigrationService {
  constructor(
    @InjectModel(v1.Beatmap.name, 'v1')
    private v1BeatmapModel: Model<v1.BeatmapDocument>,
    @InjectModel(v1.BeatmapCount.name, 'v1')
    private v1BeatmapCountModel: Model<v1.BeatmapCountDocument>,
    @InjectModel(v1.BeatmapSet.name, 'v1')
    private v1BeatmapSetCountModel: Model<v1.BeatmapSetDocument>,

    @InjectModel(v2.Beatmap.name, 'v2')
    private v2BeatmapModel: Model<v2.BeatmapDocument>,
    @InjectModel(v2.BeatmapSet.name, 'v2')
    private v2BeatmapSetModel: Model<v2.BeatmapSetDocument>,
  ) {}

  async migrateBeatmaps() {
    const beatmaps = await this.v1BeatmapModel.count();
    console.log(beatmaps);
  }
}
