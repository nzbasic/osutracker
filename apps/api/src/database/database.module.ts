import { Module } from '@nestjs/common';
import { ProxyDBServiceModule } from './proxy/db-service.module';
import { V1DBServiceModule } from './v1/db-service.module';

@Module({
  imports: [V1DBServiceModule, ProxyDBServiceModule],
  exports: [V1DBServiceModule, ProxyDBServiceModule],
})
export class DatabaseModule {}
