import { BeatmapModule } from './resources/beatmap/beatmap.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/v2', { connectionName: 'v2' }),
    MongooseModule.forRoot(process.env.MONGO ?? '', { connectionName: 'v1' }),
    DatabaseModule,
    BeatmapModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
