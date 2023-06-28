import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MigratorService } from './services/migration/migrator.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('initialized');
  const migrator = app.get(MigratorService);
  migrator.migrateAndListen();
}
bootstrap();
