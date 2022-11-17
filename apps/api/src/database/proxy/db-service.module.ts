import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { proxy } from 'database';
import { ProxyScoreStoreService } from './score-store.service';

@Module({
  providers: [ProxyScoreStoreService],
  exports: [ProxyScoreStoreService],
  imports: [
    MongooseModule.forFeature(
      [{ name: proxy.Score.name, schema: proxy.ScoreSchema }],
      'proxy',
    ),
  ],
})
export class ProxyDBServiceModule {}
