import { UserServiceV1 } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';

// "/:name/getId""/:id/getName""/:id""/:id/stats""/:id/plays""/add"
@Controller({ version: '1', path: 'users' })
export class UserControllerV1 {
  constructor(private readonly userService: UserServiceV1) {}

  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  @Get('limitedAll')
  getLimitedAll() {
    return this.userService.getAll({ limited: true });
  }

  @Get('topUserIds')
  getTopUserIds() {
    return 'Hello World!';
  }

  @Get('allFilter')
  getAllFilter() {
    return 'Hello World!';
  }

  @Get('number')
  getNumber() {
    return 'Hello World!';
  }

  @Get('limitedAllCountry/:country')
  getLimitedAllCountry(@Param('country') country: string) {
    return 'Hello World!';
  }

  @Get(':name/getId')
  getId(@Param('name') name: string) {
    return 'Hello World!';
  }

  @Get(':id/getName')
  getName(@Param('id') id: number) {
    return 'Hello World!';
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return 'Hello World!';
  }

  @Get(':id/stats')
  getByIdStats(@Param('id') id: number) {
    return 'Hello World!';
  }

  @Get(':id/plays')
  getByIdPlays(@Param('id') id: number) {
    return 'Hello World!';
  }

  @Get('add')
  getAdd() {
    return 'Hello World!';
  }
}
