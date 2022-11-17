import { Injectable } from '@nestjs/common';
import { CountryStoreService } from 'src/database/v1/country-store.service';

@Injectable()
export class CountryServiceV1 {
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
