import { Module } from '@nestjs/common';
import { MigratorService } from './migrator.service';
import { ProxyMigrationModule } from './proxy/proxy.module';
import { V1MigrationModule } from './v1/v1.module';

@Module({
  imports: [V1MigrationModule, ProxyMigrationModule],
  providers: [MigratorService],
  exports: [MigratorService],
})
export class MigrationModule {}
