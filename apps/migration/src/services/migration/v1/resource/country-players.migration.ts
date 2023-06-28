import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v1, v2 } from 'database';
import { Model, Types } from 'mongoose';
import { convertV1Scores } from '../../../../util/convert';
import { batchModelMigrate } from '../../../../util/batch';
import { CountryPlayer } from 'database/schema/v2';

const countryPlayersMigrationVersion = 1;

@Injectable()
export class CountryPlayersMigration {
  constructor(
    @InjectModel(v1.CountryPlayers.name, 'v1')
    private v1CountryPlayersModel: Model<v1.CountryPlayersDocument>,
    @InjectModel(v2.CountryPlayers.name, 'v2')
    private v2CountryPlayersModel: Model<v2.CountryPlayersDocument>,
  ) {}

  public async migrate() {
    await batchModelMigrate({
      model: this.v1CountryPlayersModel,
      batchSize: 1000,
      migrationFunc: (item) => this.updateV2CountryPlayers(item),
      migrationVersion: countryPlayersMigrationVersion,
    });
  }

  public listen() {
    // this.v1CountryModel
    //   .watch([], { fullDocument: 'updateLookup' })
    //   .on('change', (u) => {
    //     if (u.operationType === 'update' || u.operationType === 'insert') {
    //       this.updateV2Country(u.fullDocument);
    //     }
    //   });
    console.log('listening v1 plays to v2');
  }

  private async updateV2CountryPlayers(plays: v1.CountryPlayersDocument) {
    if (!plays) return console.error('plays is null');

    try {
      const newPlays: v2.CountryPlayers = {
        date: new Date(plays.date),
        name: plays.name,
        listPlayers: plays.listPlayers.map((player) => ({
          name: player.name,
          pp: Number(player.pp),
        })) as Types.Array<CountryPlayer>,
      };

      await this.v2CountryPlayersModel.create(newPlays);
    } catch (e) {
      console.error(e);
    }
  }
}
