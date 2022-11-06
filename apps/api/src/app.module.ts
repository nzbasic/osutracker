import { UtilityModule } from './services/utility.module';
import { SearchModule } from './resources/search/search.module';
import { CountryModule } from './resources/country/country.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from './database/database.module';
import { UserModule } from './resources/user/user.module';
import { StatModule } from './resources/stat/stat.module';
import { ConfigModule } from '@nestjs/config';
import { DbServiceModule } from './database/service/db-service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env['ATLAS'] ?? '', {
      authSource: 'admin',
      readPreference: 'primary',
      ssl: false,
    }),
    DbModule,
    DbServiceModule,
    CountryModule,
    UserModule,
    StatModule,
    SearchModule,
    UtilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
