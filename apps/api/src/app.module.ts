import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { ApiModuleV1 } from './resources/v1/api.module';
import { ApiModuleV2 } from './resources/v2/api.module';
import { UtilityModule } from './services/utility.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env['V1'] ?? '', {
      connectionName: 'v1',
      authSource: 'admin',
      readPreference: 'primary',
      ssl: false,
    }),
    MongooseModule.forRoot(process.env['V2'] ?? '', {
      connectionName: 'v2',
      readPreference: 'primary',
      directConnection: true,
      ssl: false,
    }),
    MongooseModule.forRoot(process.env['PROXY'] ?? '', {
      connectionName: 'proxy',
      authSource: 'admin',
      readPreference: 'primary',
      ssl: false,
    }),
    DatabaseModule,
    ApiModuleV1,
    ApiModuleV2,
    UtilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
