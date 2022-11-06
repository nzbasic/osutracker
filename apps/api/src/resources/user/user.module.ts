import { Module } from '@nestjs/common';
import { DbServiceModule } from 'src/database/service/db-service.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DbServiceModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
