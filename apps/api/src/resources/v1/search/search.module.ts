import { Module } from '@nestjs/common';
import { SearchControllerV1 } from './search.controller';
import { SearchServiceV1 } from './search.service';

@Module({
  controllers: [SearchControllerV1],
  providers: [SearchServiceV1],
})
export class SearchModuleV1 {}
