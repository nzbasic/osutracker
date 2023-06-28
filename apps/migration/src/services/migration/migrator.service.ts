import { Injectable } from '@nestjs/common';
import { MigrationService } from './types';
import { ProxyToV2MigrationService } from './proxy/proxy-v2.service';
import { V1ToV2MigrationService } from './v1/v1-v2.service';

// goal: make this database separate and migrated
// make a migration pattern for all old dbs to a new scheema
// run it on boot and then listen for changes on the old dbs
// add some data point or date to records in both dbs to know when they were migrated

@Injectable()
export class MigratorService {
  private readonly migrations: MigrationService[];
  constructor(
    private readonly v1ToV2MigrationService: V1ToV2MigrationService,
    private readonly proxyToV2MigrationService: ProxyToV2MigrationService,
  ) {
    this.migrations = [v1ToV2MigrationService, proxyToV2MigrationService];
  }

  public async migrateAndListen() {
    console.log('migrate and listen');
    await this.migrate();
    this.listen();
  }

  public async migrate() {
    console.log('migration');
    for (const migration of this.migrations) {
      await migration.migrate();
    }
  }

  public listen() {
    console.log('listening');
    for (const migration of this.migrations) {
      migration.listen();
    }
  }
}
