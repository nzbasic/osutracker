import { Module } from '@nestjs/common';
import { StatControllerV1 } from './stat.controller';
import { StatServiceV1 } from './stat.service';

@Module({
  controllers: [StatControllerV1],
  providers: [StatServiceV1],
})
export class StatModuleV1 {}
