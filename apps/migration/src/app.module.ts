import { BeatmapModule } from './resources/beatmap/beatmap.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './resources/user/user.module';
import { MigrationModule } from './services/migration/migration.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/v2', {
      connectionName: 'v2',
      authSource: 'admin',
      ssl: false,
    }),
    MongooseModule.forRoot(process.env.V1 ?? '', {
      connectionName: 'v1',
      authSource: 'admin',
      directConnection: true,
      tls: false,
      ssl: false,
    }),
    DatabaseModule,
    BeatmapModule,
    UserModule,
    MigrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
