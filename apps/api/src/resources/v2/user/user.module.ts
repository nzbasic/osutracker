import { Module } from '@nestjs/common';
import { ProxyDBServiceModule } from 'src/database/proxy/db-service.module';
import { UserControllerV2 } from './user.controller';
import { UserServiceV2 } from './user.service';

@Module({
  imports: [ProxyDBServiceModule],
  controllers: [UserControllerV2],
  providers: [UserServiceV2],
})
export class UserModuleV2 {}
