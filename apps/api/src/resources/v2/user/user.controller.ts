import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserServiceV2 } from './user.service';

@Controller({ path: 'user', version: '2' })
export class UserControllerV2 {
  constructor(private readonly userService: UserServiceV2) {}

  @Get(':id/top')
  findAll(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserTopPlays(id);
  }
}
