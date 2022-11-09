import { Module } from '@nestjs/common';
import { v1DBModule } from './v1/v1.module';
import { v2DBModule } from './v2/v2.module';

@Module({
  imports: [v1DBModule, v2DBModule],
})
export class DatabaseModule {}
