import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BeatmapMigrationService } from './migration.service';
import { v1, v2 } from 'database';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: v1.Beatmap.name, schema: v1.BeatmapSchema },
        { name: v1.BeatmapCount.name, schema: v1.BeatmapCountSchema },
        { name: v1.BeatmapSet.name, schema: v1.BeatmapSetSchema },
      ],
      'v1',
    ),
    MongooseModule.forFeature(
      [
        { name: v2.BeatmapSet.name, schema: v2.BeatmapSetSchema },
        { name: v2.Beatmap.name, schema: v2.BeatmapSchema },
      ],
      'v2',
    ),
  ],
  controllers: [],
  providers: [BeatmapMigrationService],
})
export class BeatmapModule {}
