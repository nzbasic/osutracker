import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { v1, v2 } from 'database';
import { UserMigrationService } from './migration.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: v1.User.name, schema: v1.UserSchema },
        { name: v1.UserPlays.name, schema: v1.UserPlaysSchema },
        { name: v1.UserStat.name, schema: v1.UserStatSchema },
      ],
      'v1',
    ),
    MongooseModule.forFeature(
      [
        { name: v2.User.name, schema: v2.UserSchema },
        { name: v2.UserPlays.name, schema: v2.UserPlaysSchema },
        { name: v2.UserStat.name, schema: v2.UserStatSchema },
      ],
      'v2',
    ),
  ],
  controllers: [],
  providers: [UserMigrationService],
})
export class UserModule {}
