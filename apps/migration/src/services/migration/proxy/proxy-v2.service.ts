import { Injectable } from '@nestjs/common';
import { MigrationService } from '../types';

@Injectable()
export class ProxyToV2MigrationService implements MigrationService {
  public migrate() {
    console.log('migrating proxy to v2');
  }

  public listen() {
    console.log('listening proxy to v2');
  }
}
