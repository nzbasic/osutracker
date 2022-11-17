import { Injectable } from '@nestjs/common';
import { UserStoreService } from 'src/database/v1/user-store.service';

@Injectable()
export class UserServiceV1 {
  constructor(private readonly userStoreService: UserStoreService) {}

  async getAll({ limited }: { limited?: true } = {}) {
    if (limited) {
      return await this.userStoreService.getAllLimited();
    }
    return await this.userStoreService.getAll();
  }
}
