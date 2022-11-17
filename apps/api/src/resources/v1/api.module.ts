import { Module } from '@nestjs/common';
import { CountryModuleV1 } from './country/country.module';
import { SearchModuleV1 } from './search/search.module';
import { StatModuleV1 } from './stat/stat.module';
import { UserModuleV1 } from './user/user.module';

@Module({
  imports: [UserModuleV1, StatModuleV1, SearchModuleV1, CountryModuleV1],
  exports: [UserModuleV1, StatModuleV1, SearchModuleV1, CountryModuleV1],
})
export class ApiModuleV1 {}
