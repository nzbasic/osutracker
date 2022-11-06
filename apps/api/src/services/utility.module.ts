import { OsuApiService } from './osu-api.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [OsuApiService],
  exports: [OsuApiService],
})
export class UtilityModule {}
