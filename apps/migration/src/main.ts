import { BeatmapMigrationService } from './resources/beatmap/migration.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserMigrationService } from './resources/user/migration.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  console.log('wa');

  const beatmapMigrationService = app.get(BeatmapMigrationService);
  const userMigrationService = app.get(UserMigrationService);
  userMigrationService.migrateUsers();
  // beatmapMigrationService.migrateBeatmaps();
}
bootstrap();
