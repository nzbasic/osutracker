import { Module } from '@nestjs/common';
import { V1DBServiceModule } from 'src/database/v1/db-service.module';
import { CountryControllerV1 } from './country.controller';
import { CountryServiceV1 } from './country.service';

@Module({
  imports: [V1DBServiceModule],
  controllers: [CountryControllerV1],
  providers: [CountryServiceV1],
})
export class CountryModuleV1 {}
