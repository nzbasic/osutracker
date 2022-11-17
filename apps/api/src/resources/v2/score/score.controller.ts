import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'score', version: '2' })
export class ScoreControllerV2 {
  @Get('all')
  findAll(): string {
    return 'Score';
  }
}
