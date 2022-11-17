import { v1 } from 'database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SortOrder } from 'mongoose';
import { CountryStoreService } from './country-store.service';

@Injectable()
export class UserStoreService {
  constructor(
    @InjectModel(v1.User.name, 'v1')
    private readonly userModel: v1.UserCollection,
    @InjectModel(v1.UserStat.name, 'v1')
    private readonly userStatsModel: v1.UserStatCollection,
    @InjectModel(v1.UserPlays.name, 'v1')
    private readonly userPlaysModel: v1.UserPlaysCollection,
    private readonly countryStoreService: CountryStoreService,
  ) {}

  getAllLimited(limit?: number, offset?: number) {
    return this.userModel
      .find({}, { name: 1, pp: 1, acc: 1, farm: 1, range: 1 })
      .limit(limit ?? 100)
      .skip(offset ?? 0)
      .exec();
  }

  getAll(limit?: number, offset?: number) {
    return this.userModel
      .find()
      .limit(limit ?? 100)
      .skip(offset ?? 0)
      .exec();
  }

  getTopUserIds() {
    return this.userModel
      .find({}, { id: 1 })
      .sort({ pp: 'desc' })
      .collation({ locale: 'en_US', numericOrdering: true })
      .limit(10)
      .exec();
  }

  getAllFilter(page: number, filterBy: string, order: string) {
    let parsedOrder = order as SortOrder;
    if (order !== 'asc' && order !== 'desc') {
      parsedOrder = 'asc';
    }

    return this.userModel
      .find({}, { currentTop: 0, modsCount: 0 })
      .sort({ [filterBy]: parsedOrder })
      .collation({ locale: 'en_US', numericOrdering: true })
      .limit(50)
      .skip(50 * (page - 1))
      .exec();
  }

  count() {
    return this.userModel.countDocuments().exec();
  }

  async getAllCountry(name: string) {
    const abr = await this.countryStoreService.getAbbreviationFromName(name);

    return this.userModel
      .find(
        { country: abr },
        {
          name: 1,
          id: 1,
          pp: 1,
          rank: 1,
          acc: 1,
          farm: 1,
          range: 1,
          joined: 1,
          level: 1,
          averageObjects: 1,
        },
      )
      .exec();
  }

  async getIdFromName(name: string) {
    const res = await this.userModel.findOne({ name }, { id: 1 }).exec();
    return res?.id ?? -1;
  }

  async getNameFromId(id: string) {
    const res = await this.userModel.findOne({ id }, { name: 1 }).exec();
    return res?.name ?? '';
  }

  getById(id: string) {
    return this.userModel.findOne({ id }).exec();
  }

  getStatsById(id: string) {
    return this.userStatsModel.find({ id }).exec();
  }

  getPlaysById(id: string) {
    return this.userPlaysModel.find({ id }).exec();
  }

  async exists({ name, id }: { name?: string; id?: string } = {}) {
    if (name) {
      return await this.userModel.exists({ name });
    } else if (id) {
      return await this.userModel.exists({ id });
    }
    return false;
  }

  search(name: string, limit?: number, offset?: number) {
    return this.userModel
      .find({ name: new RegExp(name, 'i') })
      .limit(limit ?? 100)
      .skip(offset ?? 0)
      .exec();
  }
}
