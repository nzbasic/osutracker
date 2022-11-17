import {
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CountryServiceV1 } from './country.service';

@Controller({ version: '1', path: 'countries' })
export class CountryControllerV1 {
  constructor(private readonly countryService: CountryServiceV1) {}

  @Get('all')
  async getAll() {
    return await this.countryService.getAll();
  }

  @Get('number')
  @Header('content-type', 'application/json')
  async getNumber() {
    return await this.countryService.getCount();
  }

  @Get('allFilter/:country')
  async getAllFilterCountry(
    @Param('country') country: string,
    @Query('name') name: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('order') order: string,
  ) {
    // return await this.countryService.getAllFilter(country, name, page, order);
  }

  @Get('limitedAll')
  getLimitedAll() {
    return 'Hello World!';
  }

  @Get(':name/details')
  getNameDetails(@Param('name') name: string) {
    console.log(name);
    return 'Hello World!';
  }

  @Get(':name/stats')
  getNameStats(@Param('name') name: string) {
    console.log(name);
    return 'Hello World!';
  }

  @Get(':name/players')
  getNamePlayers(@Param('name') name: string) {
    console.log(name);
    return 'Hello World!';
  }

  @Get(':name/plays')
  getNamePlays(@Param('name') name: string) {
    console.log(name);
    return 'Hello World!';
  }

  @Get(':abbreviation')
  getAbbreviation(@Param('abbreviation') abbreviation: string) {
    console.log(abbreviation);
    return 'Hello World!';
  }
}
