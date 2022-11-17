import { Controller, Get } from '@nestjs/common';

@Controller({ version: '1', path: 'search' })
export class SearchControllerV1 {
  @Get('all')
  findAll(): string {
    return 'This action returns all search';
  }
}
