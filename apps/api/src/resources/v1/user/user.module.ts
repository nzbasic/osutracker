import { Module } from '@nestjs/common';
import { V1DBServiceModule } from 'src/database/v1/db-service.module';
import { UserControllerV1 } from './user.controller';
import { UserServiceV1 } from './user.service';

@Module({
  imports: [V1DBServiceModule],
  controllers: [UserControllerV1],
  providers: [UserServiceV1],
})
export class UserModuleV1 {}
