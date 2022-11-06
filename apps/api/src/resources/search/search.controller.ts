import { Controller, Get } from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get('all')
  findAll(): string {
    return 'This action returns all search';
  }
}
