import { UserModuleV2 } from './user/user.module';
import { Module } from '@nestjs/common';
import { ScoreModuleV2 } from './score/score.module';

@Module({
  imports: [ScoreModuleV2, UserModuleV2],
  exports: [ScoreModuleV2, UserModuleV2],
})
export class ApiModuleV2 {}
