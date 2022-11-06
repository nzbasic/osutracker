import { Injectable } from '@nestjs/common';
import { UserStoreService } from 'src/database/service/user-store.service';

@Injectable()
export class UserService {
  constructor(private readonly userStoreService: UserStoreService) {}

  async getAll({ limited }: { limited?: true } = {}) {
    if (limited) {
      return await this.userStoreService.getAllLimited();
    }
    return await this.userStoreService.getAll();
  }
}
