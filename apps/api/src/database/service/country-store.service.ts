import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { v1 } from 'database';

@Injectable()
export class CountryStoreService {
  constructor(
    @InjectModel('Country') private readonly countryModel: v1.CountryCollection,
    @InjectModel('CountryStat')
    private readonly countryStatModel: v1.CountryStatCollection,
    @InjectModel('CountryPlays')
    private readonly countryPlaysModel: v1.CountryPlaysCollection,
    @InjectModel('CountryPlayers')
    private readonly countryPlayersModel: v1.CountryPlayersCollection,
  ) {}

  private parseName<T>(name: string) {
    let query: FilterQuery<T>;
    if (name.length == 2) {
      query = { abbreviation: { $regex: new RegExp(name, 'i') } };
    } else {
      query = { name: { $regex: new RegExp(name, 'i') } };
    }
    return query;
  }

  async getNameFromAbbreviation(abbreviation: string) {
    const res = await this.countryModel
      .findOne({ abbreviation }, { name: 1 })
      .exec();
    return res?.name ?? '';
  }

  async getAbbreviationFromName(name: string) {
    const res = await this.countryModel
      .findOne({ name }, { abbreviation: 1 })
      .exec();
    return res?.abbreviation ?? '';
  }

  getAll(limit?: number, offset?: number) {
    return this.countryModel
      .find()
      .limit(limit ?? 100)
      .skip(offset ?? 0)
      .exec();
  }

  getAllLimited(limit?: number, offset?: number) {
    return this.countryModel
      .find(
        {},
        {
          name: 1,
          abbreviation: 1,
          pp: 1,
          acc: 1,
          farm: 1,
          range: 1,
          averageObjects: 1,
          playerWeighting: 1,
        },
      )
      .limit(limit ?? 100)
      .skip(offset ?? 0)
      .exec();
  }

  count() {
    return this.countryModel.countDocuments().exec();
  }

  getDetailsByName(name: string) {
    return this.countryModel.findOne(this.parseName(name)).exec();
  }

  getPlaysByName(name: string) {
    return this.countryPlaysModel.findOne(this.parseName(name)).exec();
  }

  getPlayersByName(name: string) {
    return this.countryPlayersModel.findOne(this.parseName(name)).exec();
  }

  getStatsByName(name: string) {
    return this.countryStatModel.findOne(this.parseName(name)).exec();
  }

  search(name: string, limit?: number, offset?: number) {
    return this.countryModel
      .find(this.parseName(name))
      .limit(limit ?? 100)
      .skip(offset ?? 0)
      .exec();
  }
}
