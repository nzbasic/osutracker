import { Module } from '@nestjs/common';
import { DbServiceModule } from 'src/database/service/db-service.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [DbServiceModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
