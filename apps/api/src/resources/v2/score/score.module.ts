import { Module } from '@nestjs/common';
import { ScoreControllerV2 } from './score.controller';
import { ScoreServiceV2 } from './score.service';

@Module({
  controllers: [ScoreControllerV2],
  providers: [ScoreServiceV2],
})
export class ScoreModuleV2 {}
