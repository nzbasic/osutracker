import express from "express";
import {
  CountrySummary,
  GenericSummary,
  SearchRes,
  UserSummary,
} from "../interfaces/search";
import { CountryModel } from "../models/Country.model";
import { UserModel } from "../models/User.model";
export const searchRouter = express.Router();

searchRouter.route("/all").get(async (req, res) => {
  const page = parseInt(req.query.page as string);
  const text = (req.query.text as string).replace(
    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
    "\\$&"
  );
  const regex = new RegExp(text, "i");

  let countries: CountrySummary[] = [];
  let users: UserSummary[] = [];

  const usersPromise = UserModel.find(
    { name: { $regex: regex } },
    {
      name: 1,
      id: 1,
      pp: 1,
    }
  );

  const countriesPromise = CountryModel.find(
    { name: { $regex: regex } },
    {
      name: 1,
      abbreviation: 1,
      pp: 1,
    }
  );

  await Promise.all([
    usersPromise.then((items) => (users = items)),
    countriesPromise.then((items) => (countries = items)),
  ]);

  // null PP will mess up the sort
  users = users.filter((user) => user.pp);

  const combined: GenericSummary[] = users
    .map((user) => {
      return {
        type: "user",
        id: user.id,
        name: user.name,
        pp: user.pp,
      };
    })
    .concat(
      countries.map((country) => {
        return {
          type: "country",
          id: country.abbreviation,
          name: country.name,
          pp: country.pp,
        };
      })
    );

  const sorted = combined.sort((a, b) => parseFloat(b.pp) - parseFloat(a.pp));

  const resLength = sorted.length;
  const resPage = sorted.slice((page - 1) * 5, page * 5);

  const searchRes: SearchRes = { page: resPage, length: resLength };
  res.json(searchRes);
});
