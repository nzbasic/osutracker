import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserServiceV2 } from './user.service';

@Controller({ path: 'user', version: '2' })
export class UserControllerV2 {
  constructor(private readonly userService: UserServiceV2) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Get(':id/top')
  getUserTopPlays(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserTopPlays(id);
  }

  @Get(':id/stats')
  getUserStats(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserStats(id);
  }
}
