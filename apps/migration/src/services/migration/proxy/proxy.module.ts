import { Module } from '@nestjs/common';
import { ProxyToV2MigrationService } from './proxy-v2.service';

@Module({
  providers: [ProxyToV2MigrationService],
  exports: [ProxyToV2MigrationService],
})
export class ProxyMigrationModule {}
