import { Injectable } from '@nestjs/common';
import { CountryStoreService } from 'src/database/service/country-store.service';

@Injectable()
export class CountryService {
  constructor(private readonly countryStoreService: CountryStoreService) {}

  async getAll() {
    await this.countryStoreService.getAll();
  }

  async getCount() {
    return await this.countryStoreService.count();
  }

  // async getAllFilter(country: string, name: string, page: number, order: string) {

  // }
}
